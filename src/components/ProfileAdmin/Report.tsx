import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { url } from "../../redux/actions/user";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Report = () => {
  const [payPalPayments, setPayPalPayments] = useState<IPaymentReport[]>();
  const [stripePayments, setStripePayments] = useState<IPaymentReport[]>();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const getAllPayPalPayments = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const resp = await fetch(`${url}/pay/report?startDate=${startDate}&endDate=${endDate}`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      if (resp.ok) {
        const payments = await resp.json();
        setPayPalPayments(payments);
      } else {
        throw new Error("Get payments error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllStripePayments = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const resp = await fetch(`${url}/stripe/report?startDate=${startDate}&endDate=${endDate}`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      if (resp.ok) {
        const payments = await resp.json();
        setStripePayments(payments);
      } else {
        throw new Error("Get payments error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTotal = (payments: IPaymentReport[] | undefined) => {
    if (payments && payments.length > 0) {
      return payments.reduce((acc, item) => acc + item.total, 0);
    }
    return 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getAllPayPalPayments();
    getAllStripePayments();
  };

  const getPaymentsByDay = (payments: IPaymentReport[] | undefined) => {
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
  };

  const payPalPaymentsByDay = getPaymentsByDay(payPalPayments);
  const sortedPayPalDates = Object.keys(payPalPaymentsByDay).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  const payPalChartData = {
    labels: sortedPayPalDates,
    datasets: [
      {
        label: "Totale Incasso PayPal",
        data: sortedPayPalDates.map((date) => payPalPaymentsByDay[date]),
        backgroundColor: "#1a51bf",
        borderColor: "#1a51bf",
        borderWidth: 1,
      },
    ],
  };

  const stripePaymentsByDay = getPaymentsByDay(stripePayments);
  const sortedStripeDates = Object.keys(stripePaymentsByDay).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  const stripeChartData = {
    labels: sortedStripeDates,
    datasets: [
      {
        label: "Totale Incasso Stripe",
        data: sortedStripeDates.map((date) => stripePaymentsByDay[date]),
        backgroundColor: "#6772e5",
        borderColor: "#6772e5",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
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
      <h1 className="mb-4">Report</h1>
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
          <div className="d-flex flex-column flex-sm-row justify-content-sm-center gap-3">
            <Button type="submit" className="rounded-pill mb-3">
              Applica
            </Button>
          </div>
        </Form>
      </div>
      <div className="bg-white border rounded-4 p-3 text-center d-flex justify-content-center mt-4">
        <h3 className="m-0">Vendite PayPal: € {getTotal(payPalPayments).toFixed(2)}</h3>
      </div>
      <div className="bg-white border rounded-4 p-3 text-center d-flex justify-content-center mt-4">
        <h3 className="m-0">Vendite Stripe: € {getTotal(stripePayments).toFixed(2)}</h3>
      </div>
      <div className="mt-5">
        {payPalPayments && payPalPayments.length > 0 && (
          <div>
            <Bar data={payPalChartData} options={chartOptions} />
          </div>
        )}
      </div>
      <div className="mt-5">
        {stripePayments && stripePayments.length > 0 && (
          <div>
            <Bar data={stripeChartData} options={chartOptions} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Report;
