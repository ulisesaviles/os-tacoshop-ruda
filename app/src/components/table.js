// Styles
import "../App.css";

const Table = (props) => {
  const { data } = props;
  const headers =
    data != null && data.length >= 1 ? Object.keys(data[0]) : null;

  return headers ? (
    <div className="table">
      <div className="tableRow">
        {headers.map((header) => (
          <div className="cell cellHeader" key={header}>
            <p className="cellText cellTextHeader">{header}</p>
          </div>
        ))}
      </div>
      {data.map((row) => (
        <div className="tableRow" key={`${JSON.stringify(row)}`}>
          {headers.map((header) => (
            <div
              className={`cell cell${data.indexOf(row) % 2}`}
              key={`${header}_${row[header]}`}
            >
              <p className="cellText">{row[header]}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  ) : (
    <p className="noOrders">(No orders)</p>
  );
};

export default Table;
