import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Grid,
  CircularProgress,
  Input,
  CardContent,
  CardMedia,
  Typography,
  Card,
} from '@mui/material';

function DisplayCard({ card }) {
  return (
    <Card style={{ margin: '10px', width: '300px' }}>
      <CardMedia component="img" loading='lazy' alt={card.name} height="140" image={card.image_url} />
      <CardContent>
        <Typography variant="h6" component="div">
          {card.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {card.description}
        </Typography>
      </CardContent>
    </Card>
  );
}

function App() {
  const [cards, setCards] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCards, setFilteredCards] = useState(null);

  useEffect(() => {
    axios
      .get('https://api.punkapi.com/v2/beers')
      .then((response) => {
        setCards(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    if (!cards) {
      return;
    }
    const filtered = cards.filter((card) =>
      card.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCards(filtered);
  }, [cards, searchQuery]);

  return (
    <Grid container md={12}>
      <Grid container alignItems='center' justifyContent="space-between" p={1} bgcolor="pink" md={12} sm={12} xs={12}>
        <Grid item>
          <h1>PunkAPI</h1>
        </Grid>
        <Grid item>
          <Grid item md={12} m textAlign="center">
            <Input
              placeholder="Search Cards"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item container>
        <Grid item container justifyContent='center' mt={1}>
          {filteredCards ? (
            filteredCards.map((card) => <DisplayCard key={card.id} card={card} />)
          ) : (
            <Grid item container justifyContent="center" alignItems="center" md={12} height="80vh">
              <CircularProgress />
            </Grid>
          )}
          {filteredCards && filteredCards.length === 0 && (
            <Grid md={12} textAlign="center">
              <h3>OOPS! No result Found</h3>
            </Grid>
          )}

          {!filteredCards && <Grid item container justifyContent='center' alignItems='center' md={12} height='80vh'><CircularProgress /></Grid>}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
