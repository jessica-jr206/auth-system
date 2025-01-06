import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import api from '../utils/api';


const CardDisplay = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await api.get('/auth/news');
        setNews(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchNews();
  }, []);
  return (
    <div className="container mt-4">
      <Row>
        {news.map((card, index) => (
          <Col key={index} md={4}>
            <Card>
              <Card.Img variant="top" src={card.photo} />
              <Card.Body>
                <Card.Title>{card.title}</Card.Title>
                <Card.Text>{card.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CardDisplay;
