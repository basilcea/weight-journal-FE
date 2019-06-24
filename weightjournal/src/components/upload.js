

const mywidget = (callback) =>

window.cloudinary.createUploadWidget(
  {
    cloudName: "basilcea",
    uploadPreset: "weightJournal",
    folder: "weightJournal",
    cropping: true
  },
  (error, result) => {
    if (result && result.event === "success") {
      callback(result)
    }
  }
);
export default mywidget;
