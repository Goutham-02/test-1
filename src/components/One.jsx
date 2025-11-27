const One = (props) => {
  const handleClick = () => {
    const copy = Object.values(props).join(' ');
    navigator.clipboard.writeText(copy);
  };

  return (
    <table style={{ width: '15%', fontFamily: 'sans-serif', fontSize: '15px', color: '#333', borderCollapse: 'collapse' }}>
      <tbody>
        <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
          <td style={{ padding: '8px', textAlign: 'left' }}>{props.topic}</td>
          <td style={{ padding: '8px', textAlign: 'right' }}>
            <button
              onClick={handleClick}
              style={{
                background: 'transparent',
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '4px 10px',
                fontSize: '13px',
                cursor: 'pointer',
                color: '#555'
              }}
            >
              Copy
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default One;
