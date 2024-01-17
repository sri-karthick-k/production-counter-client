import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

export default function data() {
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "device Id", accessor: "mac", width: "45%", align: "left" },
      { Header: "Name", accessor: "name", align: "left" },
      { Header: "Time", accessor: "timestamp", align: "center" },
      { Header: "Count", accessor: "count", align: "center" },
    ],

    rows: [
        {
            "mac": "B0:B2:1C:42:BC:9C",
            "name": "device 3",
            "timestamp": "2024-01-13T11:50:58.000Z",
            "count": 2
        },
        {
            "mac": "B0:B2:1C:42:BC:9C",
            "name": "device 3",
            "timestamp": "2024-01-13T11:50:59.000Z",
            "count": 3
        },
        {
            "mac": "B0:B2:1C:42:BC:9C",
            "name": "device 3",
            "timestamp": "2024-01-14T14:50:59.000Z",
            "count": 4
        },
        {
            "mac": "B0:B2:1C:42:BC:9C",
            "name": "device 3",
            "timestamp": "2024-01-15T15:00:02.180Z",
            "count": 5
        },
        {
            "mac": "B0:B2:1C:42:BC:9C",
            "name": "device 3",
            "timestamp": "2024-01-17T14:50:59.000Z",
            "count": 6
        }
    ],
  };
}
