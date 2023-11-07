import React, { useState } from 'react';
import Sidebar from './Sidebar';
import {
  Box,
  Container,
  Paper,
  Select,
  MenuItem,
  Typography,
  Divider,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LineChart from '../Charts/LineChart';
import BarChart from '../Charts/BarChart';
import DataTable from '../Charts/DataTable';
import TotalCash from '../Charts/TotalCash';


function Dashboard() {

  const [selectedMonth, setSelectedMonth] = useState('January');


  const data = [
    { date: "jan-01-08", name: "Coca-Cola", category: "Beverages", value: 72454, Account: 'Account 1', Month: 'January', YID: '123', In: '250', Out: '600'},
    { date: "jan-10-08", name: "Microsoft", category: "Technology", value: 70196, Account: 'Account 2', Month: 'January', YID: '234', In: '350', Out: '600' },
    { date: "jan-17-08", name: "IBM", category: "Business Services", value: 53183, Account: 'Account 3', Month: 'January', YID: '345', In: '450', Out: '600' },
    { date: "jan-23-08", name: "Intel", category: "Technology", value: 39048, Account: 'Account 4', Month: 'January', YID: '567', In: '550', Out: '600' },
    { date: "may-05-01", name: "Nokia", category: "Technology", value: 38528, Account: 'Account 5', Month: 'May', YID: '678' , In: '50', Out: '230'},
    { date: "june-06-01", name: "Sony", category: "Technology", value: 45000, Account: 'Account 6', Month: 'June', YID: '789' , In: '500', Out: '130'},
    { date: "july-07-01", name: "Apple", category: "Technology", value: 60000, Account: 'Account 7', Month: 'July', YID: '890', In: '750', Out: '200' },
    { date: "aug-08-01", name: "Samsung", category: "Technology", value: 55000, Account: 'Account 8', Month: 'August', YID: '901', In: '750', Out: '600' },
    { date: "sep-09-01", name: "Google", category: "Technology", value: 58000, Account: 'Account 9', Month: 'September', YID: '912', In: '900', Out: '200' },
    { date: "oct-10-01", name: "Amazon", category: "Technology", value: 63000, Account: 'Account 10', Month: 'October', YID: '923', In: '250', Out: '400' },
    { date: "nov-20-02", name: "Facebook", category: "Technology", value: 67000, Account: 'Account 11', Month: 'November', YID: '934', In: '650', Out: '630' },
    { date: "dec-2-06", name: "Twitter", category: "Technology", value: 71000, Account: 'Account 12', Month: 'December', YID: '945' , In: '350', Out: '660'},
    { date: "may-05-08", name: "Coca-Cola", category: "Beverages", value: 72454, Account: 'Account 15', Month: 'May', YID: '123' , In: '850', Out: '690'},
  ];


  const [isFileUploadOpen, setIsFileUploadOpen] = useState(false);


  const uniqueMonths = Array.from(new Set(data.map(item => item.Month)));

  const handleFileUploadOpen = () => {
    setIsFileUploadOpen(true);
  };

  const handleFileUploadClose = () => {
    setIsFileUploadOpen(false);
  };

  return (
    <>
      <Sidebar>
        <Box className="main-dashboard" >
          <Container className="container-1" style={{ display: 'flex' }}>
            <Paper className="box">
              <Box style={{ display: "flex" }}>
                {/* <heading>Checking Accounts</heading> */}
                <Select
                  labelId="month-select-label"
                  id="month-select"
                  value={selectedMonth}
                  onChange={e => setSelectedMonth(e.target.value)}
                  style={{ marginLeft: "280px", fontSize: "small", height: "22px", width: "120px" }}
                >
                  {uniqueMonths.map(month => (
                    <MenuItem key={month} value={month}>
                      {month}
                    </MenuItem>
                  ))}
                </Select>

              </Box>
              <Divider />
              <LineChart 
              data={data} selectedMonth={selectedMonth}/>
            </Paper>
            <Paper className="box">
              <Button variant='contained' style={{ margin: "2px", fontSize: "xx-small", marginLeft: "260px" }}
                startIcon={<AddCircleOutlineIcon />}
                onClick={handleFileUploadOpen} >New sales invoice</Button>
              <Divider />
              <BarChart data={data} selectedMonth={selectedMonth} />

            </Paper>
          </Container>
          <Container className="container-1" style={{ display: 'flex' }}>
            <Paper className="box">
              <Typography style={{display:"flex", gap:"13px"}}>
                <span>Total Cash Flow</span>
                <Box><img  style={{borderRadius:"50%", height:"15px", width:"15px", backgroundColor:'#4CAF50',marginLeft:"40px"}}/>In</Box>
                <Box><img  style={{borderRadius:"50%", height:"15px", width:"15px", backgroundColor:'#2196F3'}}/>Out</Box>
              </Typography>
              <Divider />
              <TotalCash data={data} selectedMonth={selectedMonth}/>
            </Paper>
            <Paper className="box">
              <Typography>Account Watch List</Typography>
              <Divider />
              <DataTable data={data} selectedMonth={selectedMonth} />
            </Paper>
          </Container>
        </Box>
      </Sidebar>
      <Box>
        <Dialog open={isFileUploadOpen} onClose={handleFileUploadClose}>
          <DialogTitle>Upload Sales Invoice</DialogTitle>
          <DialogContent>
            <DialogContentText>

              <Paper style={{ padding: "12px" }}>
                <input type="file" />
                <Typography variant="caption">
                  <h2>Please select the sales invoice file to upload.</h2>
                </Typography>
              </Paper>

            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleFileUploadClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleFileUploadClose} color="primary" type='file'>
              Upload
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}

export default Dashboard;
