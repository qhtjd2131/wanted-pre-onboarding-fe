import * as styleVariables from '../../styles/globalVariables';
import React, { useState } from 'react';
import styled from 'styled-components';
import Feed from './Feed';
import { useEffect, useCallback } from 'react';
import axios from 'axios';

const Contents = () => {
  const [data, setData] = useState([]);
  const [rerender, setRerender] = useState(0);

  //getFeed Function
  const getFeeds = useCallback(async () => {
    const result = await axios
      .get('http://localhost:8080/feeds')
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        console.log(e.message);
        return [];
      });
    return result;
  }, []);

  useEffect(() => {
    getFeeds().then((res) => {
      setData(res);
    });
  }, [rerender]);

  const feedsContents =
    data.length != 0 ? (
      data.map((feed) => (
        <Feed
          key={feed.id}
          feedData={feed}
          forceUpdate={() => {
            setRerender((value) => value + 1);
          }}
        />
      ))
    ) : (
      <NotFoundFeed>Not Found Feed</NotFoundFeed>
    );

  return <ContentsContainer>{feedsContents}</ContentsContainer>;
};

export default Contents;

const ContentsContainer = styled.div`
  width: ${styleVariables.feed_width};
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media only screen and (max-width: 400px) {
    width: 100%;
  }
`;

const NotFoundFeed = styled.div`
  width: ${styleVariables.feed_width};
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${styleVariables.border_color};
`;
