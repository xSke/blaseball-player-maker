import React from "react";
import { FormGroup, Form } from "react-bootstrap";

export default function NotesPanel(props: {
  notes: string;
  setNotes: (newNotes: string) => void;
}) {
  return (
    <FormGroup>
      <Form.Label>Notes</Form.Label>
      <Form.Control
        as="textarea"
        placeholder="Type arbitrary notes here..."
        value={props.notes}
        onChange={(e) => {
          props.setNotes(e.target.value);
        }}
        rows={8}
      />
    </FormGroup>
  );
}
