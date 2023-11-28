/*
some code from 
https://javascript.plainenglish.io/using-node-js-s3-to-create-delete-list-buckets-and-upload-list-objects-part-2-fb1b76da36dc
*/
const s3ClientPackage = require('@aws-sdk/client-s3');
const fs = require('fs');

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_RAHUL_PERSONAL_USE,
  secretAccessKey: process.env.SECRET_ACCESS_KEY_PERSONAL_USE
});

const createBucket = (bucketName) => {
  var bucketParams = {
    Bucket: bucketName
  };

  s3.createBucket(bucketParams, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Successful createBucket", data.location)
    }
  })
};

const listBuckets = () => {
  s3.listBuckets((err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Succesfull list buckets", data.Buckets);
    }
  })
};

const uploadFile = (filePath,bucketName,keyName) => {
  // Read the file
  const file = fs.readFileSync(filePath);

  // Setting up S3 upload parameters
  const uploadParams = {
      Bucket: bucketName, // Bucket into which you want to upload file
      Key: keyName, // Name by which you want to save it
      Body: file // Local file 
  };

  s3.upload(uploadParams, function(err, data) {
      if (err) {
          console.log("Error", err);
      } 
      if (data) {
          console.log("Upload Success", data.Location);
      }
  });
};

const listObjectsInBucket = (bucketName) => {
  // Create the parameters for calling listObjects
  var bucketParams = {
      Bucket : bucketName,
  };

  // Call S3 to obtain a list of the objects in the bucket
  s3.listObjects(bucketParams, function(err, data) {
      if (err) {
          console.log("Error", err);
      } else {
          console.log("Success", data);
      }
  });
}

const deleteBucket = (bucketName) => {
  // Create params for S3.deleteBucket
  var bucketParams = {
      Bucket : bucketName
  };

  // Call S3 to delete the bucket
  s3.deleteBucket(bucketParams, function(err, data) {
      if (err) {
          console.log("Error", err);
      } else {
          console.log("Success", data);
      }
  });
}

module.exports = {
  createBucket: createBucket,
  listBuckets: listBuckets,
  uploadFile: uploadFile,
  listObjectsInBucket: listObjectsInBucket,
  deleteBucket: deleteBucket
}