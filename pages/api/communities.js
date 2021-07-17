import { SiteClient } from 'datocms-client';

export default async function requestReception (request, response) {

if(request.method === 'POST') {
  const TOKEN = '1de980c1150e47537722b9851502d9';
  const client = new SiteClient(TOKEN);

  const registerCreated = await client.items.create({
    itemType: '975421',
    ...request.body,
    // title: "Test Community",
    // imageUrl: "https://github.com/danilo0391.png",
    // creatorSlug: "danilopereira"
  })

  console.log(registerCreated);

  response.json({
    dados: 'Some data',
    registerCreated: registerCreated,
  })
  return;
}

response.status(404).json({
  message: "There's no GET method yet, however you can use POST one"
})
}

  