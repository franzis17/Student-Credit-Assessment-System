class DataUtils {
  
  /**
   * Replaces all null fields in the "dataArray" with "NO DATA"
   */
  replaceNullFields(dataArray) {
    dataArray.forEach((data) => {
      // replace all null fields with "NO DATA"
      for (const field in data) {
        if (data[field] === null) {
          data[field] = "NO DATA";
        }
      }
    });
  }
  
}

export default DataUtils;
