const axios = require("axios");
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");

const { B2_KEY_ID, B2_APPLICATION_KEY } = require("../config");

const authString = `${B2_KEY_ID}:${B2_APPLICATION_KEY}`;
const encodedBase64 = new Buffer.alloc(authString.length, authString).toString(
  "base64"
);

async function connectAuth() {
  try {
    const res = await axios.post(
      "https://api.backblazeb2.com/b2api/v2/b2_authorize_account",
      {},
      {
        headers: { Authorization: `Basic ${encodedBase64}` }
      }
    );

    return {
      accountId: B2_KEY_ID,
      applicationKey: B2_APPLICATION_KEY,
      apiUrl: res.data.apiUrl,
      authorizationToken: res.data.authorizationToken,
      downloadUrl: res.data.downloadUrl,
      recommendedPartSize: res.data.recommendedPartSize
    };
  } catch (err) {
    console.error(err);
  }
}

async function createBucket(bucketName) {
  try {
    const auth = await connectAuth();

    const res = await axios.get(
      `${auth.apiUrl}/b2api/v2/b2_create_bucket?accountId=${auth.accountId}&bucketName=${bucketName}&bucketType=allPrivate`,
      {
        headers: { Authorization: auth.authorizationToken }
      }
    );

    console.log(res);
  } catch (err) {
    console.error(err);
  }
}

// createBucket("glitch-dot-test");

async function getBucketId() {
  try {
    const auth = await connectAuth();

    const res = await axios.get(
      `${auth.apiUrl}/b2api/v2/b2_list_buckets?accountId=${auth.accountId}`,
      {
        headers: { Authorization: auth.authorizationToken }
      }
    );

    const bucketData = res.data.buckets[0];

    const { bucketId, bucketName } = bucketData;

    return {
      bucketId,
      bucketName
    };
  } catch (err) {
    console.error(err);
  }
}

getBucketId();
