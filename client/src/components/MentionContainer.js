import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import Mention from "../components/Mention/Mention";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const MentionContainer = (props) => {
  const { companyName } = props;
  const [mentions, setMentions] = useState([]);
  const styles = useStyles();

  useEffect(() => {
    const makeCallToBackEnd = async (companyName) => {
      try {
        const { data } = await axios(`/mention/company/${companyName}`);
        setMentions(data);
      } catch (error) {}
    };
    makeCallToBackEnd(companyName);
  }, [setMentions, companyName]);

  const mentionsRender = mentions.map((mention) => (
    <Mention
      className={styles.mention}
      key={mention.title}
      title={mention.title}
      source={mention.platform}
      body={mention.content}
      imgSrc={mention.image}
      imgAlt={mention.platform}
      mood="good"
    />
  ));

  return <div className={styles.root}>{mentionsRender}</div>;
};

export default MentionContainer;
