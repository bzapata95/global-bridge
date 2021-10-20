import { SimpleGrid, Box, Text, theme } from "@chakra-ui/react";
import { memo } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

import { Layout } from "../../../components/Layout";

const optionsChart: ApexOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: "datetime",
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      "2021-03-18T00:00:00.000Z",
      "2021-03-19T00:00:00.000Z",
      "2021-03-20T00:00:00.000Z",
      "2021-03-21T00:00:00.000Z",
      "2021-03-22T00:00:00.000Z",
      "2021-03-23T00:00:00.000Z",
      "2021-03-24T00:00:00.000Z",
    ],
  },
  fill: {
    opacity: 0.3,
    type: "gradient",
    gradient: {
      shade: "dark",
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
};
const seriesChart = [{ name: "serie1", data: [31, 23, 34, 123, 34, 23, 100] }];

function Dashboard() {
  return (
    <Layout>
      <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
        <Box p="8" bg="gray.800" borderRadius={8}>
          <Text>Registrados</Text>
          <Chart
            options={optionsChart}
            series={seriesChart}
            type="area"
            height={160}
          />
        </Box>
      </SimpleGrid>
    </Layout>
  );
}

export default memo(Dashboard);
