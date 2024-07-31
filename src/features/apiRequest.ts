import { useDispatch } from "react-redux";
import { useAppSelector } from "../redux/hooks";
import { setData } from "../redux/slice";
import { useEffect } from "react";


export function useApiRequest() {
  const dispatch = useDispatch();
  const playerId = useAppSelector(state => state.user.id);
  const apiKey: string = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI2ZTk4YzM0MC0wMTY4LTAxM2QtZThiOC0wZWZjZTE3NWQ4MjUiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNzE3MTUyMTYyLCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6Ii1jMjUyMmQ3NS1jMmEwLTQzMjAtYjJlYS0zZGRmMTdiYjkyNzcifQ.yTwYQYHp4OnSPJn-DC_OC0w_M3kKZJi6l2qGFqCHY3I';


  useEffect(() => {
    if (playerId) {
      fetch(`https://api.pubg.com/shards/steam/players/${playerId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Accept': 'application/vnd.api+json',
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log(data);

          dispatch(setData(data.data));
        })
        .catch(error => {
          console.error('There was a problem with your fetch operation:', error);
        });
    }
  }, [playerId, dispatch]);

  return null;
}

export default useApiRequest;
