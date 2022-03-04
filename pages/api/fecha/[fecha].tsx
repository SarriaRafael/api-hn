
import  {NextApiRequest, NextApiResponse} from 'next'
import axios from 'axios' 

export default async  function handler(req:NextApiRequest, res:NextApiResponse) {
  let baseRafa:Array<string> = [];

  return axios
    .get(
      "http://hn.algolia.com/api/v1/search_by_date?numericFilters=created_at_i>" +
      req.query.fecha
    )
    .then((chat) => {            
      baseRafa = chat.data.hits;
      return res.status(200).json({ salida: baseRafa });
    })
    .catch((err) => {      
      baseRafa.push(err);
      return res.status(200).send(baseRafa);
    });
}
