import { useState } from "react";
import { Container, Row, Col, Card, Modal } from "react-bootstrap";
import Layout from "../components/Layout";

const Labs = () => {
  const [activePdf, setActivePdf] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleOpen = (pdfUrl) => {
    setActivePdf(pdfUrl);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setActivePdf(null);
  };

  return (
    <Layout
      title="Dragon Organics | Lab Test"
      description="Explore the Dragon Organics blog - a gateway to insights on Thai Kratom and Blue Lotus. Dive into the world of holistic botanical wisdom."
    >
      <div className="labs-container bg-black pt-5">
        <div className="page-header">
          <div className="py-lg-5 container header-container">
            <div className="row">
              <div className="news-text col-lg-12 mx-auto text-center text-white">
                <h1 className="header-one">Dragon Organics</h1>
                <h1 className="header-two">Lab Results</h1>
                <p>
                  We don't just test the powder in US labs but also in
                  government accredited labs in Thailand. We do this for our
                  continued research and so that we ensure the consistency and
                  purity of our products.
                </p>
              </div>
            </div>
          </div>
        </div>
        <Container className="pb-5">
          <Row>
            {/* Card 1 */}
            <Col md={4} className="mb-4">
              <Card
                onClick={() =>
                  handleOpen("/images/pdf/lab-test-02-04-2025.jpg")
                }
                style={{ cursor: "pointer" }}
              >
                <Card.Img
                  variant="top"
                  src="/images/pdf/lab-test-02-04-2025-p1.jpg"
                />
                <Card.Body>
                  <Card.Text>Red Vien 02/04/2025</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card
                onClick={() =>
                  handleOpen("/images/pdf/lab-test-01-09-2025-white.jpg")
                }
                style={{ cursor: "pointer" }}
              >
                <Card.Img
                  variant="top"
                  src="/images/pdf/lab-test-01-09-2025-p1.jpg"
                />
                <Card.Body>
                  <Card.Text>White Vien 01/23/2025</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <Modal show={showModal} onHide={handleClose} size="xl" centered>
          <Modal.Header closeButton>
            <Modal.Title>Labs Results</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            {activePdf && (
              <div className="d-flex justify-content-center">
                <iframe
                  src={`${activePdf}#toolbar=0&navpanes=0&scrollbar=0`}
                  width="80%"
                  height="600px"
                  style={{ border: "none" }}
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
            )}
          </Modal.Body>
        </Modal>
      </div>
    </Layout>
  );
};

export default Labs;
