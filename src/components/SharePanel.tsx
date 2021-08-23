import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { shortenUrl } from "../api/tiny";

export default function SharePanel(props: { data: string }) {
  const router = useRouter();
  const [shareLink, setShareLink] = useState<string | null>();

  useEffect(() => {
    setShareLink(null);
  }, [props.data]);

  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>Raw data</Form.Label>
        <Form.Control
          className="font-monospace"
          as="textarea"
          readOnly={true}
          value={props.data}
        />
      </Form.Group>

      <div>
        <Button
          type="primary"
          onClick={async () => {
            setShareLink(null);

            const url = "https://insplect.netlify.app" + router.asPath;
            const shortened = await shortenUrl(url);
            setShareLink(shortened);
          }}
        >
          Share
        </Button>
        {shareLink ? (
          <span className="ms-3">
            Link: <a href={shareLink}>{shareLink}</a>
          </span>
        ) : null}
      </div>
    </div>
  );
}