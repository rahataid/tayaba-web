// import dynamic from 'next/dynamic';
import { Tree, TreeNode } from 'react-organizational-chart';
import styled from '@emotion/styled';
import { Button, Grid, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/system';
import PropTypes from 'prop-types';

// const TreeImport = dynamic(() => import('react-organizational-chart'), { ssr: false });

// const Tree = TreeImport?.Tree;
// const TreeNode = TreeImport?.TreeNode;
// const TreeNode = dynamic(() => import('react-organizational-chart'), { ssr: false });

const StyledNode = styled(Button)`
  ${({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1, 2),
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,

    boxShadow: theme.customShadows.z8,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  })}}
`;

const TreeNodeCard = ({ node, theme, onNodeClick, selectedNode }) => (
  <StyledNode
    theme={theme}
    onClick={() => onNodeClick(node)}
    sx={{
      mt: 2,
      'background-color':
        selectedNode?.nodeName === node?.nodeName
          ? `${theme.palette.success.main} !important`
          : theme.palette.text.primary,
    }}
  >
    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={12}>
      <Grid container direction="column" justifyContent="center" alignItems="center">
        <Typography
          fontWeight={700}
          variant="button"
          sx={{
            color: selectedNode?.nodeName === node?.nodeName ? '#fff' : theme.palette.text.primary,
          }}
        >
          {node?.nodeName}
        </Typography>

        {/* {node.balance && <Typography variant="caption">Balance: {node?.balance} </Typography>}
        {node.disbursed && <Typography variant="caption">Beneficiaries: {node.disbursed} </Typography>} */}
      </Grid>
    </Stack>
  </StyledNode>
);

TreeNodeCard.propTypes = {
  node: PropTypes.object,
  theme: PropTypes.object,
  onNodeClick: PropTypes.func,
  selectedNode: PropTypes.object,
};

const TreeTracker = ({ tree, onNodeClick = () => {}, selectedNode }) => {
  const theme = useTheme();
  return (
    <>
      {tree?.map((nodes) => (
        <Tree
          key={nodes?.nodeName}
          label={<TreeNodeCard onNodeClick={onNodeClick} selectedNode={selectedNode} theme={theme} node={nodes} />}
        >
          {nodes?.childNode?.map((node) => (
            <TreeNode
              key={node.nodeName}
              label={<TreeNodeCard onNodeClick={onNodeClick} selectedNode={selectedNode} theme={theme} node={node} />}
            >
              {node?.childNode?.map((node) => (
                <TreeNode
                  key={node.nodeName}
                  label={
                    <TreeNodeCard onNodeClick={onNodeClick} selectedNode={selectedNode} theme={theme} node={node} />
                  }
                >
                  {node?.childNode?.map((node) => (
                    <TreeNode
                      key={node.nodeName}
                      label={
                        <TreeNodeCard onNodeClick={onNodeClick} selectedNode={selectedNode} theme={theme} node={node} />
                      }
                    >
                      {node?.childNode?.map((node) => (
                        <TreeNode
                          key={node.nodeName}
                          label={
                            <TreeNodeCard
                              onNodeClick={onNodeClick}
                              selectedNode={selectedNode}
                              theme={theme}
                              node={node}
                            />
                          }
                        >
                          {node?.childNode?.map((node) => (
                            <TreeNode
                              key={node.nodeName}
                              label={
                                <TreeNodeCard
                                  onNodeClick={onNodeClick}
                                  selectedNode={selectedNode}
                                  theme={theme}
                                  node={node}
                                />
                              }
                            />
                          ))}
                        </TreeNode>
                      ))}
                    </TreeNode>
                  ))}
                </TreeNode>
              ))}
            </TreeNode>
          ))}
        </Tree>
      ))}
    </>
  );
};

TreeTracker.propTypes = {
  tree: PropTypes.array.isRequired,
  onNodeClick: PropTypes.func,
  selectedNode: PropTypes.object,
};

export default TreeTracker;
