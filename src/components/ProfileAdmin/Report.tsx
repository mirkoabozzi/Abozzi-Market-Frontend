import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { url } from "../../redux/actions/user";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Report = () => {
  const [payments, setPayments] = useState<IPaymentReport[]>();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const getAllPayments = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const resp = await fetch(`${url}/pay/report?startDate=${startDate}&endDate=${endDate}`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      if (resp.ok) {
        const payments = await resp.json();
        setPayments(payments);
      } else {
        throw new Error("Get payments error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTotal = () => {
    if (payments && payments.length > 0) {
      return payments.reduce((acc, item) => acc + item.total, 0);
    }
    return 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getAllPayments();
  };

  const paymentsByDay = (() => {
    const dailyData: { [key: string]: number } = {};
    payments?.forEach((payment) => {
      const day = new Date(payment.paymentDate).toLocaleDateString("it-IT");
      if (dailyData[day]) {
        dailyData[day] += payment.total;
      } else {
        dailyData[day] = payment.total;
      }
    });
    return dailyData;
  })();

  const sortedDates = Object.keys(paymentsByDay).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  const chartData = {
    labels: sortedDates,
    datasets: [
      {
        label: "Totale Incasso",
        data: sortedDates.map((date) => paymentsByDay[date]),
        backgroundColor: "#1a51bf",
        borderColor: "#1a51bf",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "Incassi per Data",
      },
    },
  };

  return (
    <div className="mainAnimation">
      <h3 className="mb-4">Report</h3>
      <div className="d-flex flex-column flex-sm-row justify-content-sm-center">
        <Form onSubmit={handleSubmit}>
          <div className="d-sm-flex gap-2">
            <Form.Group className="mb-3" controlId="formStartDate">
              <Form.Label>Inizio</Form.Label>
              <Form.Control type="datetime-local" placeholder="Data inizio" required value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEndDate">
              <Form.Label>Fine</Form.Label>
              <Form.Control type="datetime-local" placeholder="Data fine" required value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </Form.Group>
          </div>
          <div className="d-flex flex-column flex-sm-row justify-content-sm-center">
            <Button type="submit" className="rounded-pill mb-3">
              Applica
            </Button>
          </div>
        </Form>
      </div>
      <div className="d-flex flex-column flex-sm-row justify-content-sm-center">
        <div className="bg-white border rounded-4 p-3 text-center d-flex justify-content-center mt-4">
          <h3 className="m-0">Vendite: € {getTotal().toFixed(2)}</h3>
        </div>
      </div>
      <div className="mt-4 h-100 overflow-y-auto d-flex justify-content-center">
        {payments && payments.length > 0 && (
          <div>
            <Bar data={chartData} options={chartOptions} style={{ height: "500px" }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Report;
