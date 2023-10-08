class DataUtils {
  
  /**
   * Replaces all null fields in the "dataArray" with "NO DATA"
   */
  replaceNullFields(dataArray, dataFields) {
    dataArray.forEach((data) => {
      dataFields.forEach((field) => {
        if (data[field] === null) {
          data[field] = "NO DATA";
        }
      });
    });
  }
  
}

export default DataUtils;
