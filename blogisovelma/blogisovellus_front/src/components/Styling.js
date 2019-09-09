
const inputStyle1 = () => {
  return (
    {
      borderImage: 'linear-gradient(to left, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)',
      outline: '3px solid transparent', borderImageSlice: 5, backgroundColor: 'transparent'
    }
  );
};
const inputStyle2 = () => {
  return (
    {
      borderImage: 'linear-gradient(to right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)',
      outline: '3px solid transparent', borderImageSlice: 5, backgroundColor: 'transparent'
    }
  );
};
const logoutStyle = () => {
  return (
    {
      borderImage: 'linear-gradient(to left, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)',
      outline: '3px solid transparent', borderImageSlice: 5, backgroundColor: 'transparent',
      display: 'inline-block', marginLeft: 1 + 'em', marginRight: 0.5 + 'em'
    }
  );
};
const tableStyle = () => {
  return (
    {
      marginTop: '2em', outline: '1px solid transparent',
      display: 'block', width: '90%', textAlign: 'left'}
  );
};
const tableBodyStyle = () => {
  return (
    {
      margin: '1em',
      background: 'linear-gradient(to top left, violet, indigo, blue, green, yellow, orange, red)',
      WebkitBackgroundClip: 'text', color: 'transparent'}
  );
};

const styles = () => {
  return {
    logoutStyle: logoutStyle(),
    inputStyle1: inputStyle1(),
    inputStyle2: inputStyle2(),
    tableStyle: tableStyle(),
    tableBodyStyle: tableBodyStyle()
  };
};

export default styles;