import React, { useEffect, useState } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import Mention from "../components/Mention/Mention";
import Spinner from "../components/Spinner";

const useStyles = makeStyles((theme) => ({
  pagination: {
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
  },
}));

const MentionContainer = (props) => {
  const { companyName } = props;
  const itemsPerPage = 10;
  const [isLoading, setIsLoading] = useState(true);
  const [mentions, setMentions] = useState([]);
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const styles = useStyles();

  useEffect(() => {
    const makeCallToBackEnd = async (companyName) => {
      try {
        const { data, status } = await axios(`/mention/company/${companyName}`);
        setMentions(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    makeCallToBackEnd(companyName);
    setNumberOfPages(() => {
      return Math.ceil(mentions.length / itemsPerPage);
    });
  }, [companyName, mentions.length, itemsPerPage]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const mentionsRender = mentions
    .slice((page - 1) * itemsPerPage, page * itemsPerPage)
    .map((mention, key) => (
      <Mention
        className={styles.mention}
        key={key}
        title={mention.title}
        source={mention.platform}
        body={mention.content}
        imgSrc={mention.image}
        imgAlt={mention.platform}
        mood={mention.mood}
        url={mention.url}
      />
    ));

  if (isLoading)
    return (
      <div className={styles.root}>
        <Spinner />
      </div>
    );

  return (
    <div className={styles.root}>
      <div className={styles.mentions}>{mentionsRender}</div>
      {/* <div className={styles.paginationContainer}> */}
      <Pagination
        count={numberOfPages}
        page={page}
        onChange={handlePageChange}
        defaultPage={1}
        size="large"
        color="primary"
        className={styles.pagination}
      />
      {/* </div> */}
    </div>
  );
};

export default MentionContainer;
