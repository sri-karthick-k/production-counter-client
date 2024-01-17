import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import values from "layouts/report/data/Values";

// Additional libraries
import jsPDF from "jspdf";
import "jspdf-autotable";

function Report() {
  const { columns, rows } = values();
  const [loading, setLoading] = useState(false);

  const generatePdf = () => {
    setLoading(true);

    const pdfDoc = new jsPDF();
    pdfDoc.autoTable({ head: [columns.map((col) => col.Header)], body: rows.map(row => Object.values(row)) });
    pdfDoc.save("report.pdf");

    setLoading(false);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Device Values
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={generatePdf}
                  disabled={loading}
                >
                  {loading ? "Generating PDF..." : "Generate PDF"}
                </Button>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Report;
