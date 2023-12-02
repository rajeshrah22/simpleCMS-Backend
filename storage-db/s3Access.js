/*
some code from 
https://javascript.plainenglish.io/using-node-js-s3-to-create-delete-list-buckets-and-upload-list-objects-part-2-fb1b76da36dc

and others from
https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/javascript_s3_code_examples.html
*/
const { S3Client, ListBucketsCommand,
    CreateBucketCommand, DeleteBucketCommand,
        PutObjectCommand, ListObjectsV2Command,
            PutBucketWebsiteCommand, DeletePublicAccessBlockCommand,
                PutBucketPolicyCommand } = require('@aws-sdk/client-s3')
const fs = require('fs')

const client = new S3Client({})

const createBucket = async (bucketName) => {
  var bucketParams = {
    Bucket: bucketName
  }

  const command = new CreateBucketCommand(bucketParams)

  try {
    const { Location } = await client.send(command)
    console.log(`Bucket created with location ${Location}`)
  } catch (err) {
    console.error(err)
  }
}

const listBuckets = async () => {
  const command = new ListBucketsCommand({})

  try {
    const { Owner, Buckets } = await client.send(command)
    console.log(
      `${Owner.DisplayName} owns ${Buckets.length} bucket${
        Buckets.length === 1 ? "" : "s"
      }:`
    )
    console.log(`${Buckets.map((b) => ` • ${b.Name}`).join("\n")}`)
  } catch (err) {
    console.error(err)
  }
}

const uploadFile = async (filePath, bucketName, keyName, type="text/html") => {
  // Read the file
  const file = fs.readFileSync(filePath)

  // Setting up S3 upload parameters
  const uploadParams = {
      Bucket: bucketName, // Bucket into which you want to upload file
      Key: keyName, // Name by which you want to save it
      Body: file, // Local file
      ContentType: type
  }

  console.log(uploadParams)

  const command = new PutObjectCommand(uploadParams)

  try {
    const response = await client.send(command)
    console.log(response)
  } catch (err) {
    console.error(err)
  }
}

const listObjectsInBucket = async (bucketName) => {
  // Create the parameters for calling listObjects
  var bucketParams = {
      Bucket : bucketName,
      MaxKeys: 1
  }

  const command = new ListObjectsV2Command(bucketParams)

  try {
    let isTruncated = true

    console.log("Your bucket contains the following objects:\n")
    let contents = ""

    while (isTruncated) {
      const { Contents, IsTruncated, NextContinuationToken } =
        await client.send(command)
      const contentsList = Contents.map((c) => ` • ${c.Key}`).join("\n")
      contents += contentsList + "\n"
      isTruncated = IsTruncated
      command.input.ContinuationToken = NextContinuationToken
    }
    console.log(contents)
  } catch (err) {
    console.error(err)
  }
}

const deleteBucket = async (bucketName) => {
  // Create params for S3.deleteBucket
  var bucketParams = {
      Bucket : bucketName
  }

  const command = new DeleteBucketCommand(bucketParams)

  try {
    const response = await client.send(command)
    console.log(response)
  } catch (err) {
    console.error(err)
  }
}

const configureWebsite = async (bucketName) => {
  const bucketParams = {
    Bucket: bucketName,
    WebsiteConfiguration: {
      ErrorDocument: {
        // The object key name to use when a 4XX class error occurs.
        Key: "error.html",
      },
      IndexDocument: {
        // A suffix that is appended to a request that is for a directory.
        Suffix: "index.html",
      },
    },
  }

  const command = new PutBucketWebsiteCommand(bucketParams)

  try {
    const response = await client.send(command)
    console.log(response)
  } catch (err) {
    console.error(err + "\nError with website config")
  }
}

const deletePublicAccessBlock = async (bucketName) => {
  const bucketParams = {
    Bucket: bucketName
  }

  const command = new DeletePublicAccessBlockCommand(bucketParams)

  try{
    const response = await client.send(command)
    console.log(response)
  } catch (err) {
    console.error(err)
  }
}

const putBucketPolicy = async (policy, bucketName) => {
  const params = {
    Policy: JSON.stringify(policy),
    Bucket: bucketName
  }

  const command = new PutBucketPolicyCommand(params)

  try {
    const response = await client.send(command);
    console.log(response);
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  createBucket: createBucket,
  listBuckets: listBuckets,
  uploadFile: uploadFile,
  listObjectsInBucket: listObjectsInBucket,
  deleteBucket: deleteBucket,
  configureWebsite: configureWebsite,
  deletePublicAccessBlock: deletePublicAccessBlock,
  putBucketPolicy: putBucketPolicy
}