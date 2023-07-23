import http from "http";
import https from "https";
import { existsSync, mkdirSync, createWriteStream } from "fs";
import { dirname } from "path";

const createDirectoryIfNotExists = (dirPath) => {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }
};

const downloadFile = (fileUrl, filePath) => {
  return new Promise((resolve, reject) => {
    const protocol = fileUrl.startsWith("https") ? https : http;

    const request = protocol.get(fileUrl, (response) => {
      // Handle the response status code
      if (response.statusCode !== 200) {
        reject(
          new Error(`File download failed. Status Code: ${response.statusCode}`)
        );
        return;
      }

      const directory = dirname(filePath);
      createDirectoryIfNotExists(directory);

      // Create a writable stream to save the file
      const fileStream = createWriteStream(filePath);

      // Pipe the response to the file stream to save the data
      response.pipe(fileStream);

      // Handle the completion of the file download
      fileStream.on("finish", () => {
        resolve("File download completed.");
      });

      // Handle errors during the file download
      fileStream.on("error", (err) => {
        reject(err);
      });
    });

    // Handle errors during the request
    request.on("error", (err) => {
      reject(err);
    });
  });
};

export default downloadFile;
