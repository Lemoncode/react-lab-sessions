import * as React from "react"
import Card from '@material-ui/core/Card';
import { HotelEntityVm } from "../hotel-collection.vm";
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import Avatar from "@material-ui/core/Avatar/Avatar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/edit';
import DeleteIcon from '@material-ui/icons/delete';
import { CardContent, CardMedia, Typography, CardActions } from "@material-ui/core";

interface Props {
  hotel: HotelEntityVm;
}

export const HotelCard = (props: Props) => {
  const {hotel} = props;

  return (
    <Card>
    <CardHeader 
      avatar={
        <Avatar aria-label="Hotel">
        {hotel.rating}
        </Avatar>
      }
      action={
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      }                  
      title={hotel.name} 
      subheader={hotel.address}
    />
    <CardContent>
      <div style=
        {{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
        <CardMedia
          image={hotel.picture}
          title={hotel.name}
        />
        <Typography variant="subtitle1" gutterBottom>
          {hotel.description}
        </Typography>
      </div>
    </CardContent>
    <CardActions disableActionSpacing>
      <IconButton aria-label="Add to favorites">
        <EditIcon />
      </IconButton>
      <IconButton aria-label="Share">
        <DeleteIcon />
      </IconButton>
    </CardActions>
  </Card>
)
}

