import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import photo1 from "../Images/photo1.png";
import photo2 from "../Images/photo2.png";
import photo3 from "../Images/photo3.png";
import photo4 from "../Images/photo4.png";
import photo5 from "../Images/photo5.png";
import photo6 from "../Images/photo6.png";
import photo7 from "../Images/photo7.png";
import photo8 from "../Images/photo8.png";
import photo9 from "../Images/photo9.png";
import { Container, Grid, Typography } from "@mui/material";

function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    autoplay: true,
  };

  return (
    <>
      <Slider {...settings}>
        <div>
          <img src={photo1} alt="" style={{ height: "100%", width: "100%" }} />
        </div>
        <div>
          <img src={photo2} alt="" style={{ height: "100%", width: "100%" }} />
        </div>
        <div>
          <img src={photo3} alt="" style={{ height: "100%", width: "100%" }} />
        </div>
        <div>
          <img src={photo4} alt="" style={{ height: "100%", width: "100%" }} />
        </div>
      </Slider>

      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "32px",
          marginTop: "55px",
        }}
      >
        <Grid>
          <div style={{ width: "50%" }}>
            <img src={photo5} alt="" />
          </div>
        </Grid>
        <Grid>
          <div style={{ width: "50%" }}>
            <img src={photo6} alt="" />
          </div>
        </Grid>
      </Container>
      <Container style={{ marginTop: "20px" }}>
        <Typography variant="h2" className="text">
          Collections You'll Love
        </Typography>
        <Typography variant="h6" className="text1">
          Let's take a glimpse at our featured collections before diving in!!
        </Typography>{" "}
        <hr />
      </Container>

      <Container
        style={{
          display: "flex",
          width: "90%",
          margin: " 30px auto",
          gap: "32px",
          justifyContent: "center",
          maxHeight: "30vw",
        }}
      >
        <Grid>
          <div>
            <img
              src={photo7}
              alt=""
              style={{ height: "100%", width: "100%" }}
            />
          </div>
        </Grid>
        <Grid>
          <div>
            <img
              src={photo8}
              alt=""
              style={{ height: "100%", width: "100%" }}
            />
          </div>
        </Grid>
        <Grid>
          <div>
            <img
              src={photo9}
              alt=""
              style={{ height: "100%", width: "100%" }}
            />
          </div>
        </Grid>
      </Container>
    </>
  );
}

export default Carousel;
