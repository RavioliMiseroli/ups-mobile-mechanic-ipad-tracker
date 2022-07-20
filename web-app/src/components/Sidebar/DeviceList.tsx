import { useAppSelector } from "../../redux/hooks";
import { selectFilteredData } from "../../redux/slices/DeviceDataSlice";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import "./SideBar.css";

const DeviceList = () => {
  const deviceData = useAppSelector(selectFilteredData);

  return deviceData.length > 0 ? (
    <table className="table-auto w-full mt-2 rounded-lg">
      <thead>
        <tr>
          <th className="rounded-l-lg"></th>
          <th className="">Device Id</th>
          <th> Name</th>
          <th className="rounded-r-lg"> Owner</th>
        </tr>
      </thead>
      <tbody>
        {deviceData.map((data) => {
          return (
            <tr key={data.id}>
              <td className="text-right">
                {data.deviceStatus === "active" ? (
                  <FiberManualRecordIcon style={{ fill: "#6DAF3A" }} />
                ) : (
                  <FiberManualRecordIcon style={{ fill: "#DF2901" }} />
                )}
              </td>
              <td className="">{data.id}</td>
              <td>{data.deviceName}</td>
              <td>{data.deviceOwner}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  ) : (
    <div className="text-center text-xl mt-10">No Device Found</div>
  );
};

export default DeviceList;
