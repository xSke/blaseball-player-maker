import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Button } from "react-bootstrap";

export default function EditButton(props: { pathname: string }) {
  const router = useRouter();
  return (
    <Link
      href={{
        pathname: props.pathname,
        query: router.query,
      }}
    >
      <Button variant="secondary align-self-end">Edit</Button>
    </Link>
  );
}
