import React from 'react';
import PropTypes from 'prop-types';
import { Card, Grid, Stack, Typography, useTheme, } from '@mui/material';
import { useProjectContext } from '@contexts/projects';
import ActionMenu from './ActionMenu';
import AmountForm from '../cash-tracker/AmountForm';
import { useRahatAdmin } from '@services/contracts/useRahatAdmin';
import { useRouter } from 'next/router';
import useDialog from '@hooks/useDialog';

const TitleCard = (props) => {
    const { singleProject } = useProjectContext();
    const {  agencyChainData } = useRahatAdmin();
    const theme = useTheme()
    const {
        push,
        query:{
            projectId
        }
    } = useRouter()
 
    const actionTitle = "Actions";

    const  handlecreateToken = ()=>{
        const { isDialogShow, showDialog, hideDialog } = useDialog;

        const CashActions = {
            async acceptCash() {
              showLoading('cashTrack');
              await claimCash(agencyChainData.cashAllowance);
              refreshData();
              hideLoading('cashTrack');
            },
        
            async sendCashToPalika(amount) {
              if (amount > agencyChainData?.cashBalance) {
                alert('Not enough balance to send');
                return;
              }
              showLoading('cashTrack');
              await sendToPalika(projectId, amount);
              refreshData();
              hideLoading('cashTrack');
            },
          };
        return(
            <AmountForm
            title="Send Cash to Palika"
            description={
              <>
                Please select the amount you wish to send to palika. Palika has to accept the cash before it is fully
                transferred and allowed for disbursement. <br />
                <br />
                Your currentBalance is {agencyChainData?.cashBalance}
              </>
            }
            cashBalance={agencyChainData?.cashBalance}
            approveCashTransfer={CashActions.sendCashToPalika}
            handleClose={hideDialog}
            open={true}
          />
        )
    }

    const handleBeneficiaryRouteAction = ()=>{
        push(`/projects/${projectId}/beneficiaries`)
    }


    const menuItems = [{
        onclick:"/",
        name:"Send Token"
    },
    {
        onClick:handlecreateToken,
        name:"Create Token"
    },
    {
        onClick:handleBeneficiaryRouteAction,
        name:"Beneficiaries"
    },
   
]
    return (
        <Card variant='outlined'style={{ border: `1px solid ${theme.palette.primary.light}` }}>
            <Stack sx={{ p: 1 }} direction="row" justifyContent="space-between" alignItems="center" spacing={12}>
                <Grid container direction="column" justifyContent="center" alignItems="flex-start">
                    <Typography variant="h5" >
                        {singleProject?.data?.name}
                    </Typography>
                </Grid>
                
                <Grid container direction="column" justifyContent="center" alignItems="flex-endS">
                       <ActionMenu   menuItems ={menuItems} actionTitle = {actionTitle}/>
                </Grid>
            </Stack>
        </Card>


    );
};



export default TitleCard;
