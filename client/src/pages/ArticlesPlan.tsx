import { Container, Card, Button } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

const CardsContainer = styled.div`
  display: flex;
  height: 75vh;
  align-items: center;
  justify-content: center;
`;

const CardHeader = styled.div`
  height: 30rem;
  display: flex;
  color: white;
  align-items: center;
  justify-content: center;
`;

const PriceCircle = styled.div`
  border: 0.5rem solid white;
  width: 12.5rem;
  height: 12.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0.1rem 0.1rem 1rem rgba(19, 20, 19, 0.342);
`;

const PriceText = styled.p`
  font-size: 3rem;
  color: white;
  text-shadow: 0.1rem 0.1rem 1rem rgba(19, 20, 19, 0.342);
`;

const backgroundColors: any = {
  Basic: "#EFDCF9",
  Standard: "#FF5765",
  Premium: "#A8E10C",
};

function ArticlesPlan() {
  // type is any, could go through and set a type for everything returned
  const [prices, setPrices] = useState<any>([]);
  useEffect(() => {
    fetchPrices();
  }, []);
  const fetchPrices = async () => {
    const { data: response } = await axios.get(
      "http://localhost:5000/subs/prices"
    );
    setPrices(response.data);
  };

  const createSession = async (priceId: string) => {
    const { data: response } = await axios.post(
      "http://localhost:5000/subs/session",
      {
        priceId,
      }
    );

    // Gets what the url response is and goes to that page
    window.location.href = response.url;
  };

  return (
    <Container>
      <CardsContainer>
        {prices.map((price: any) => {
          return (
            <Card
              style={{
                width: "18rem",
                height: "25rem",
                marginRight: "2rem",
                backgroundColor: "#323E42",
              }}
            >
              <Card.Title
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "2rem",
                  color: "white",
                  marginTop: "0.5rem",
                }}
              >
                {price.nickname}
              </Card.Title>
              <CardHeader
                style={{ backgroundColor: backgroundColors[price.nickname] }}
              >
                <PriceCircle>
                  <PriceText>${price.unit_amount / 100}</PriceText>
                </PriceCircle>
              </CardHeader>
              <Card.Body style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  style={{ backgroundColor: "#3CACAE", border: "none" }}
                  onClick={() => createSession(price.id)}
                >
                  Buy Now
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </CardsContainer>
    </Container>
  );
}

export default ArticlesPlan;
