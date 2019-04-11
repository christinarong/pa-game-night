import React from "react";
import { Dialog, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemText, Typography } from "@material-ui/core";
import { Delete } from "@material-ui/icons";

function EditUsersDialog(props) {
  return (
    <Dialog className="dialog" fullWidth={true} maxWidth={"sm"} open={props.open} onClose={props.onClose}>
      <DialogTitle>Edit Users</DialogTitle>
      <DialogContent>
        {props.userList.length > 0
          ? <List dense={true}>
              {props.userList.map(userName => (
                <ListItem>
                  <ListItemText>{userName}</ListItemText>
                  <IconButton aria-label="Delete" onClick={() => props.onDeleteUser(userName)}>
                    <Delete />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          : <Typography>No users to display.</Typography>
        }
      </DialogContent>
    </Dialog>
  );
}

export { EditUsersDialog };
