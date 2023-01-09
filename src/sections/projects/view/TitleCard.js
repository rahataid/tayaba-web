import React, {  useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Grid, Stack, Typography, Button } from '@mui/material';
import { useProjectContext } from '@contexts/projects';
import ActionMenu from './ActionMenu';
 import AmountForm from '../cash-tracker/AmountForm';
import { useRahatAdmin } from '@services/contracts/useRahatAdmin';
import { useRouter } from 'next/router';

const  TOKEN_ACTIONS ={
    TRANSFER:"Transfer",
    CREATE:"Create"
};

const TitleCard = (props) => {
    const { singleProject } = useProjectContext();
    const { agencyChainData } = useRahatAdmin();
    

    const {push,query: {projectId}} = useRouter();

    const [tokenDialog,setTokenDialog] = useState(false)
    const [modalData,setModalData] = useState({
        title:'',
        description:'',
        action:''
    })
    const TOKEN_MODAL_DATA = {
        Transfer:{
            title:"Transfer Token",
            description: <>
                Please enter No Of token you wish to transfer . Receiver has to accept the token before it is fully
                transferred and allowed for disbursement. <br />
                <br />
                Your remaining token are  {agencyChainData?.cashBalance}
              </>,
              action:"Transfer"
        },
        Create:{
            title:"Create Token",
            description: <>
                Please enter No Of token you wish to Create  <br />
                <br />
                Your have total  {agencyChainData?.cashBalance} tokens
              </>,
              action:"Create"
        }
    }

    
    const handleCreateTokenModal = (action) => {
        if(!tokenDialog) return
       setTokenDialog(prev=>!prev)
       

    };

    

    const handleBeneficiaryRouteAction = () => {
        push(`/projects/${projectId}/beneficiaries`)
    }

    const menuItems = [{
        onclick: '/',
        name: "Transfer Token"
    },
    {
        onClick: handleCreateTokenModal(),
        name: "Create Token"
    },
    ]
    return (
        <>
          <AmountForm
                title="Transfer Token"
                description ={<>
                    Please enter No Of token you wish to transfer . Receiver has to accept the token before it is fully
                    transferred and allowed for disbursement. <br />
                    <br />
                    Your remaining token are  {agencyChainData?.cashBalance}
                  </>}
                  action="Transfer"
               
                cashBalance={0}
                approveCashTransfer={(() => { })}
               
                open={tokenDialog}
            />
            <Grid item xs={12} md={12}>
                <Card variant='outlined'>
                    <Stack sx={{ p: 1 }} direction="row" justifyContent="space-between" alignItems="center" spacing={12}>
                        <Grid container direction="column" justifyContent="center" alignItems="flex-endS">
                            <Button variant='outlined' onClick={handleBeneficiaryRouteAction}> Beneficiaries</Button>
                        </Grid>
                        <Grid container direction="column" justifyContent="center" alignItems="flex-endS">
                            <ActionMenu menuItems={menuItems} actionTitle="Actions" />
                        </Grid>
                    </Stack>
                </Card>
            </Grid>
            <Grid item xs={12} md={12}>
                <Card variant='outlined'>
                    <Stack sx={{ p: 1 }} direction="row" justifyContent="space-between" alignItems="center" spacing={12}>
                        <Grid container direction="column" justifyContent="center" alignItems="flex-start">
                            <Typography variant="h5" >
                                {singleProject?.data?.name}
                            </Typography>
                        </Grid>

                    </Stack>
                </Card>
            </Grid>
        </>

    );
};



export default TitleCard;
