// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import  {NextApiRequest, NextApiResponse} from 'next'
import axios from 'axios' 
 
type noti = {
  objectID:string,
  title:string,
  author:string,
  created_at:string
}

export default async  function handler(req:NextApiRequest, res:NextApiResponse) {
  let baseRafa:Array<string> = [];

  let fecha: Number = 11604189000;
  console.log("los datos de entrada: ");
  console.log(req.query);

  return axios
    .get(
      "http://hn.algolia.com/api/v1/search_by_date?numericFilters=created_at_i<" +
        fecha +"&page=15"
    )
    .then((chat) => {
      chat.data.hits.map((c:noti) => {
        console.log(c.created_at);
        console.log("nombre: ");
        console.log(c.author);
      });
      console.log(chat.data );
      baseRafa = chat.data.hits;
      return res.status(200).json({ salida: baseRafa });
    })
    .catch((err) => {
      console.log(err);
      baseRafa.push(err);
      return res.status(200).send(baseRafa);
    });

}
