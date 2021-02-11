import React from "react";
import Navbar from './navbar'
import Sidebar from './Sidebar'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
// CSS
import './Dashboard.css'
import { CardContent, Typography } from "@material-ui/core";
function DashBoard(){
  return (
    <div>
      <Navbar/>
      <div className = "screenContainer">
        <Sidebar/>
        <div className = "mainScreen">
            <div className = "content">
              <div className = "mainHeader">
              <Typography style={{backgroundColor:'white'}}>My Mentions</Typography>
                <ButtonGroup color = "primary" style={{backgroundColor:'white'}}>
                 <Button>Most recent</Button>
                 <Button>Most popular</Button>
                </ButtonGroup>
              </div>
              <ResultCard/>
              <ResultCard/>
              <ResultCard/>
              
          </div>
        </div>
      </div>

    </div>
  );
  
}

const ResultCard = () => {
  return(
  <CardContent className = "card">
    <Typography> Company Name Title Holder</Typography>
    <Typography> The company discriptions lalalalalalalallalala</Typography>
  </CardContent>
  );
};
export default DashBoard;