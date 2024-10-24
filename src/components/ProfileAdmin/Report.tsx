import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { url } from "../../redux/actions/user";

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

  return (
    <div className="mainAnimation">
      <h3>Report</h3>
      <div className="d-flex justify-content-evenly">
        <Form onSubmit={handleSubmit}>
          <div className="d-block d-sm-flex gap-2">
            <Form.Group className="mb-3" controlId="formStartDate">
              <Form.Label>Inizio</Form.Label>
              <Form.Control type="datetime-local" placeholder="Data inizio" required value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEndDate">
              <Form.Label>Fine</Form.Label>
              <Form.Control type="datetime-local" placeholder="Data fine" required value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </Form.Group>
          </div>
          <div className="text-center">
            <Button type="submit" className="rounded-pill mb-3">
              Applica
            </Button>
          </div>
        </Form>
      </div>
      <div className="d-flex justify-content-center">
        <div className="bg-white border w-75 rounded-4 p-3 text-center d-flex justify-content-center">
          <h3 className="m-0">Vendite: € {getTotal().toFixed(2)}</h3>
        </div>
      </div>
    </div>
  );
};

export default Report;
