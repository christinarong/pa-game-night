import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  IconButton,
  ListItemSecondaryAction
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";

export { AddGamesDialog, EditUsersDialog };

function EditUsersDialog(props) {
  return (
    <Dialog fullWidth={true} maxWidth={"sm"} open={props.open} onClose={props.onClose}>
      <DialogTitle>Edit Users</DialogTitle>
      <DialogContent>
        <List>
          {props.userList.map(userName => (
            <ListItem>
              <ListItemText>{userName}</ListItemText>
              <ListItemSecondaryAction>
                <IconButton aria-label="Delete" onClick={() => props.onDeleteUser(userName)}>
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
}

function AddGamesDialog(props) {
  return <div />;
}
