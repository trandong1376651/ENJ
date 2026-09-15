export const jsonToCsv = (jsonData) => {
  if (!jsonData || !jsonData.length) return '';
  const keys = Object.keys(jsonData[0]);
  const header = keys.join(',') + '\n';
  const rows = jsonData.map(row => {
    return keys.map(key => {
      let cell = row[key] === null || row[key] === undefined ? '' : row[key];
      if (String(cell).includes(',')) cell = `"${cell}"`;
      return cell;
    }).join(',');
  }).join('\n');
  
  return header + rows;
};