import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import PropTypes from "prop-types";
import { CSVLink } from "react-csv";


const Table = ({ data }) => {
  console.log(data, "data in table component =>");

  const fileName = `mis-data-${new Date().toLocaleDateString("en-CA")}`;
  const modifiedData = data.map(itrm => ({
     ...itrm,
     subHits: itrm.subHits !== null ? itrm.subHits : 0,
     mis_date: itrm.mis_date.split("T")[0],
 
  
  }))
  return (
    <div className="  w-full">
    <div className="grid grid-cols-1 lg:grid-cols-1 ">
      <div className="gjustify-center p-3 ">
        <div className="">
      <CSVLink
        className="export-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        data={data}
        filename={fileName}
      >
        Export To Excel
      </CSVLink>

      <div className="">
      <DataTable size="small" tableStyle={{ minWidth: '90rem', }}   style={{ border:"2px" }}responsive={true} exportFilename={fileName} showGridlines value={modifiedData} paginator rows={5}>
      <Column  size="small"   style={{ fontSize: "small", border: "1px solid #ddd", padding: "8px",width:"100px" }}  field="mis_date"  header="DATE"></Column>
      <Column field="subHits"    style={{ fontSize: "small", border: "1px solid #ddd", padding: "8px" }} header="SUBHITS"></Column>
      <Column field="success_sub_hit"    style={{ fontSize: "small", border: "1px solid #ddd", padding: "8px" }} header="SUCCESS SUB HITS"></Column>
      <Column field="fail_sub_hit"    style={{ fontSize: "small", border: "1px solid #ddd", padding: "8px" }}header="FAIL SUB HITS"></Column>
      <Column field="sub_revenue"     style={{ fontSize: "small", border: "1px solid #ddd", padding: "8px" }}header="SUB REVENUE"></Column>
      <Column field="renHits"     style={{ fontSize: "small", border: "1px solid #ddd", padding: "8px" }}header="RENHITS"></Column>
      <Column field="success_ren_hit"   style={{ fontSize: "small", border: "1px solid #ddd", padding: "8px" }} header="SUCCESS REN HIT"></Column>
      <Column field="fail_ren_hit"   style={{ fontSize: "small", border: "1px solid #ddd", padding: "8px" }} header="FAIL REN HIT"></Column>
      <Column field="ren_revenue"    style={{ fontSize: "small", border: "1px solid #ddd", padding: "8px" }} header="REN REVENUE"></Column>
      <Column field="active_base"    style={{ fontSize: "small", border: "1px solid #ddd", padding: "8px" }} header="ACTIVE BASE"></Column>
      <Column field="unsub"     style={{ fontSize: "small", border: "1px solid #ddd", padding: "8px" }} header="UNSUB"></Column>
      <Column field="total_revenue"   style={{ fontSize: "small", border: "1px solid #ddd", padding: "8px" }} header="TOTAL REVENUE"></Column>
      <Column field="total_base"   style={{ fontSize: "small", border: "1px solid #ddd", padding: "8px" }} header="TOTAL BASE"></Column>
      <Column field="new_sub"   style={{ fontSize: "small", border: "1px solid #ddd", padding: "8px" }} header="NEW SUB"></Column>
      <Column field="daily_pack"   style={{ fontSize: "small", border: "1px solid #ddd", padding: "8px" }} header="Daily pack"></Column>
      <Column field="weekly_pack"   style={{ fontSize: "small", border: "1px solid #ddd", padding: "8px" }} header="Weekly pack"></Column>
      </DataTable>
      </div>
     
    </div>
    </div>
    </div>
    </div>
  );
};

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Table;
