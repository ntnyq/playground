export default defineEventHandler(async event => {
  const { state, code } = getQuery(event)

  if (!code || !state) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Missing authorisation code.',
    })
  }

  if (state !== getCookie(event, 'state')) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Potential cross-site request forgery detected.',
    })
  }

  const config = useRuntimeConfig(event)

  const { access_token: accessToken } = await $fetch<{ access_token: string }>(
    'https://github.com/login/oauth/access_token',
    {
      method: 'POST',
      body: {
        client_id: config.github.clientId,
        client_secret: config.github.clientSecret,
        code,
      },
    },
  )

  if (!accessToken) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Authorisation code invalid.',
    })
  }

  const ghUser = await $fetch<{ id: number; login: string }>('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'Ntnyq Playground',
    },
  })

  setCookie(event, 'github-user', ghUser.login)

  return await sendRedirect(event, `/auth/github/${ghUser.login.toLowerCase()}`)
})
