import { useEffect } from "react";
import { Button, Card, Container, Figure } from "react-bootstrap";
import Jumbotron from "react-bootstrap";
import { getProduct } from "../apis/api/product";
import { getProduct1 } from "../apis/services/product";
const Index = () => {
  useEffect(() => {
    (async () => {
      await getProduct(1)
        .then(getProduct1)
        .then((res) => console.log(res));
    })();
  }, []);
  return (
    <Figure>
      <Figure.Image
        width={171}
        height={180}
        alt="171x180"
        src="https://picsum.photos/171/180"
      />
      <Figure.Caption>
        Nulla vitae elit libero, a pharetra augue mollis interdum.
      </Figure.Caption>
    </Figure>
  );
};

export default Index;
