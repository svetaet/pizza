import React, { memo } from 'react'
import { css } from '@emotion/core'

const Bottom = memo(() => {
	return (
		<>
			<div
				css={css`
					padding: 50px 10px 30px 10px;
					box-sizing: border-box;
					width: 100%;
					max-width: 1100px;
					& > h4 {
						margin: 20px 0 0 0;
					}
					& > p {
						margin: 0;
					}
				`}
			>
				<h4>{'Betingelser for Latini Take-Away'}</h4>
				<p>
					{
						'Nedenstående salgs- og leveringsbetingelser gælder for alle leverancer fra Latini Take-Away'
					}
				</p>
				<p>{'Vi tager forbehold for udsolgte varer og trykfejl.'}</p>

				<h4>{'Betaling af varer'}</h4>
				<p>
					{
						"Hos  Latini Take-Away har du to muligheder for betaling. Der kan enten betales via kortbetaling (Dankort, Visa, etc ) eller kontant ved levering. Ved betaling med kreditkort overføres kortinformationerne til Latini Take-Away's hjemmeside via en sikker forbindelse, der er godkendt af PBS(Nets)."
					}
				</p>

				<h4>{'Levering'}</h4>
				<p>
					{
						'Der pålægges et beløb for levering indenfor byzonen. Latini Take-Away vil bestræbe sig på at levere dine varer inden for de angivet 45 minutter.  Latini Take-Away kan i den forbindelse ikke drages til ansvar ved uforsete hændelser ( vejuheld, forkert adresse mm ) der skulle forsinke leveringen. I ferier og på helligdage bør påregnes ekstra leveringstid. Ingen levering af ordre under 150kr.'
					}
				</p>

				<h4>{'Fortrydelsesret'}</h4>
				<p>
					{
						'Ved køb via  Latini Take-Away hjemmeside er der ingen fortrydelsesret eller returret, såfremt købet omfatter fødevarer '
					}
				</p>

				<h4>{'Misbrug'}</h4>
				<p>
					{
						'Alle former for misbrug afhjemmesiden, bliver automatisk logget og vil dermed blive retsforfulgt/politianmeldt. '
					}
				</p>

				<h4>{'Personoplysninger'}</h4>
				<p>
					{
						'De personlige oplysninger, som du indtaster under et køb, bruges udelukkende til ordrebehandling, og bliver IKKE videregivet til tredje part. Alle personlige oplysninger gemmes i 10 år for at lette en ny handel og til efterforskning i tilfælde af svindel.'
					}
				</p>

				<p>
					{
						'I tilfælde af fejlbestilling eller ændringer af afgivet ordre Kontakt Latini Take-Away på tlf: 59 26 68 80 hurtigst muligt.'
					}
				</p>
			</div>
			<div
				css={css`
					width: 100%;
					background: #f9f9f9;
					padding: 10px 0;
					display: flex;
					flex-direction: column;
					align-items: center;
					& > * {
						text-transform: uppercase;
						margin: 3px 0;
					}
				`}
			>
				<p>alle rettigheder forbeholdes</p>
				<p
					css={css`
						font-weight: bold;
					`}
				>
					restaurant-name
				</p>
				<p>restaurant adress</p>
			</div>
		</>
	)
})

export default Bottom
