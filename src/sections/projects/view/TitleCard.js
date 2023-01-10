import React, {  useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Grid, Stack, Typography, Button } from '@mui/material';
import { useProjectContext } from '@contexts/projects';
import ActionMenu from './ActionMenu';
 import TransferTokenDialog from '../cash-tracker/TransferTokenDialog';
 import CreateTokenDialog from '../cash-tracker/CreateTokenDialog';

import { useRahatAdmin } from '@services/contracts/useRahatAdmin';
import { useRouter } from 'next/router';


const TitleCard = (props) => {
    const { singleProject } = useProjectContext();
    const { agencyChainData } = useRahatAdmin();
    

    const {push,query: {projectId}} = useRouter();

    const [createTokenDialog,setCreateTokenDialog] = useState(false);
    const [transferTokenDialog,setTransferTokenDialog] = useState(false);


    const handleClose = ()=>{
        setTransferTokenDialog(false);
        setCreateTokenDialog(false);
    }

    const handleCreateTokenModal = ( )=> {
        setTransferTokenDialog(false);
        setCreateTokenDialog(prev=>!prev);
    };

    const handleTransferTokenModal = ( )=> {
        setCreateTokenDialog(false)
        setTransferTokenDialog(prev=>!prev);
    };

    const handleBeneficiaryRouteAction = () => {
        push(`/projects/${projectId}/beneficiaries`)
    }

    const menuItems = [{
        onClick: handleTransferTokenModal,
        name: "Transfer Token"
    },
    {
        onClick: handleCreateTokenModal,
        name: "Create Token"
    },
    ]
    return (
        <>
          <TransferTokenDialog
                description ={<>
                    Please enter No Of token you wish to transfer . Receiver has to accept the token before it is fully
                    transferred and allowed for disbursement. <br />
                    <br />
                    Your remaining token are  {agencyChainData?.cashBalance}
                  </>}               
                cashBalance={0}
                handleClose = {handleClose}
                open={transferTokenDialog}
            />
            <CreateTokenDialog
               description= {<>
                   Please enter No Of token you wish to Create  <br />
                   <br />
                   Your have total  {agencyChainData?.cashBalance} tokens
                 </>}
                cashBalance={0}
                handleClose = {handleClose}
                open={createTokenDialog}
            />
            <Grid item xs={12} md={12}>
                <Card variant='outlined'>
                    <Stack sx={{ p: 1 }} direction="row" justifyContent="space-between" alignItems="center" >
                        <Grid container direction="column" justifyContent="center" alignItems="flex-endS">
                            <Button variant='text' onClick={handleBeneficiaryRouteAction}> Beneficiaries</Button>
                        </Grid>
                        <Grid container direction="column" justifyContent="center" alignItems="center" >
                            <ActionMenu menuItems={menuItems} actionTitle="Actions" />
                        </Grid>
                    </Stack>
                </Card>
            </Grid>
        </>

    );
};



export default TitleCard;
