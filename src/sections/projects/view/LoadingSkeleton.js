import { Container, Grid, Paper } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

const SkeletonComponent = () => (
  <Container maxWidth="lg">
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Paper>
          <Skeleton variant="rectangular" width="100%" height={400} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper>
          <Grid container spacing={2}>
            {[...Array(6)].map((_, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Skeleton variant="rectangular" width="100%" height={100} />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  </Container>
);

export default SkeletonComponent;
