const axios = require("axios");
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");
const { Readable, Writable } = require("stream");

const { B2_KEY_ID, B2_APPLICATION_KEY } = require("../../config");

const authString = `${B2_KEY_ID}:${B2_APPLICATION_KEY}`;
const authStringBase64 = new Buffer.alloc(
  authString.length,
  authString
).toString("base64");

async function getAuth() {
  try {
    const res = await axios.post(
      "https://api.backblazeb2.com/b2api/v2/b2_authorize_account",
      {},
      {
        headers: { Authorization: `Basic ${authStringBase64}` }
      }
    );

    return {
      accountId: B2_KEY_ID,
      applicationKey: B2_APPLICATION_KEY,
      apiUrl: res.data.apiUrl,
      token: res.data.authorizationToken,
      downloadUrl: res.data.downloadUrl,
      recommendedPartSize: res.data.recommendedPartSize
    };
  } catch (err) {
    console.error(err);
  }
}

async function createBucket(bucketName) {
  try {
    const auth = await getAuth();

    const res = await axios.get(
      `${auth.apiUrl}/b2api/v2/b2_create_bucket?accountId=${auth.accountId}&bucketName=${bucketName}&bucketType=allPrivate`,
      {
        headers: { Authorization: auth.token }
      }
    );

    console.log(res);
  } catch (err) {
    console.error(err);
  }
}

async function getBucketId() {
  try {
    const auth = await getAuth();

    const res = await axios.get(
      `${auth.apiUrl}/b2api/v2/b2_list_buckets?accountId=${auth.accountId}`,
      {
        headers: { Authorization: auth.token }
      }
    );

    const bucketData = res.data.buckets[0];

    const { bucketId, bucketName } = bucketData;

    return {
      id: bucketId,
      name: bucketName
    };
  } catch (err) {
    console.error(err);
  }
}

async function getUploadUrl() {
  try {
    const auth = await getAuth();
    const bucket = await getBucketId();

    const res = await axios.post(
      `${auth.apiUrl}/b2api/v2/b2_get_upload_url`,
      { bucketId: bucket.id },
      {
        headers: { Authorization: auth.token }
      }
    );

    const { authorizationToken, uploadUrl } = res.data;

    return {
      token: authorizationToken,
      url: uploadUrl
    };
  } catch (err) {
    console.error(err);
  }
}

async function uploadFile() {
  const fileData =
    "Each thing (a mirror's face, let us say) was infinite things";
  const fileName = "aleph.txt";
  const contentType = "text/plain";
  const sha1 = crypto
    .createHash("sha1")
    .update(fileData)
    .digest("hex");

  try {
    const uploadUrl = await getUploadUrl();
    const res = await axios.post(uploadUrl.url, fileData, {
      headers: {
        Authorization: uploadUrl.token,
        "Content-Type": contentType,
        "Content-Length": fileData.length,
        "X-Bz-File-name": fileName,
        "X-Bz-Content-Sha1": sha1,
        "X-Bz-Info-Author": "John-Doe"
      }
    });

    console.log(res);
  } catch (err) {
    console.error(err);
  }
}

async function downloadFile(fileName) {
  try {
    const auth = await getAuth();
    const bucket = await getBucketId();

    const res = await axios.get(
      `${auth.downloadUrl}/file/${bucket.name}/${fileName}`,
      {
        headers: { Authorization: auth.token }
      }
    );

    const savePath = `/downloads/${fileName}`;

    let source = new Readable();
    source._read = () => {};
    source.push(res.data);
    // source.push(null);

    let destination = fs.createWriteStream(savePath);

    source.on("end", () => {
      console.log("File successfully downloaded.");
    });

    source.pipe(destination);
  } catch (err) {
    console.error(err);
  }
}

async function downloadFileById(fileName) {
  try {
    const auth = await getAuth();
    const fileId = await getFileId(fileName);

    const res = await axios.get(
      `${auth.apiUrl}/b2api/v2/b2_download_file_by_id?fileId=${fileId}`,
      {
        headers: { Authorization: auth.token }
      }
    );

    const savePath = `/downloads/${fileName}`;

    let source = new Readable();
    source._read = () => {};
    source.push(res.data);

    let destination = fs.createWriteStream(savePath);

    source.pipe(destination);
  } catch (err) {
    console.error(err);
  }
}

async function listFiles() {
  try {
    const auth = await getAuth();
    const bucket = await getBucketId();

    let startFileName = null;
    let allFiles = [];

    while (true) {
      let res = await axios.post(
        `${auth.apiUrl}/b2api/v2/b2_list_file_names`,
        {
          bucketId: bucket.id,
          startFileName
        },
        {
          headers: { Authorization: auth.token }
        }
      );

      res.data.files.forEach(file => {
        allFiles.push(file);
      });

      startFileName = res.data.nextFileName;
      if (res.data.nextFileName === null) break;
    }

    return allFiles;
  } catch (err) {
    console.error(err);
  }
}

async function deleteFile(fileNameToDelete) {
  try {
    const auth = await getAuth();

    let fileName, fileId;
    let allFiles = await listFiles();

    allFiles.forEach(file => {
      if (file.fileName === fileNameToDelete) {
        fileId = file.fileId;
        fileName = file.fileName;
      }
    });

    const res = await axios.post(
      `${auth.apiUrl}/b2api/v2/b2_delete_file_version`,
      {
        fileName,
        fileId
      },
      {
        headers: { Authorization: auth.token }
      }
    );

    console.log(res);
  } catch (err) {
    console.error(err);
  }
}

async function getFileId(fileName) {
  try {
    const files = await listFiles();
    let fileId;

    files.forEach(file => {
      if (file.fileName === fileName) {
        fileId = file.fileId;
      }
    });

    return fileId;
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  getAuth,
  createBucket,
  getBucketId,
  getUploadUrl,
  uploadFile,
  downloadFile,
  downloadFileById,
  listFiles,
  deleteFile,
  getFileId
};
