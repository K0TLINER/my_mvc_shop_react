import { Button, Card, Container, Figure } from "react-bootstrap";
import Jumbotron from "react-bootstrap";
const Index = () => {
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
