import React from 'react';
import { connect } from 'react-redux'

import styled from "styled-components";
import { device, colours } from "../styles/variables";

import { Status } from "../constants";
import { Crypto } from "../types";

const StyledPage = styled.div`
  background-color: ${colours.bgSinglePage};
  height: 100vh;
  margin: 0;
  padding: 0;

  a {
    color: inherit;
    height: 45px;
    margin-right: 10px;
    min-width: 40px;
    text-decoration: none;
  }

  .wrapper {
    @media ${device.tablet} {
      display: grid;
      height: 200px;
      grid-template-columns: [start] 1fr [line2] 1fr [line3] 1fr [end];
      grid-template-rows: [drop1] 1fr [drop2] 1fr ;
      padding-top: 50px;
    }
  }
  `;

  const StyledDetail = styled.div`
    align-self: center;
    justify-self: center;
    margin: 0;
    padding: 0;
    width: 100%;

    .detail__label {
      color: ${colours.fontSinglePageLabel};
      font-size: 11px;
      font-weight: 700;
      line-height: 1.4;
      margin-bottom: 10px;
      padding-left: 0px;
      letter-spacing: 1px;

    }
    .detail__value {
      color: #fff;
      display: inline-block;
      letter-spacing: 1px;
      position: relative;

      &--currency {
        color: ${colours.fontSinglePageLabel};
      }
      &--crypto {
        color: #2dd47b;
        font-weight: 700;
        font-size: 11px;
        letter-spacing: 1px;
        position: relative;
        top: -2px;
      }
    }
    `;

  const StyledDetailTaller = styled(StyledDetail)`
  @media ${device.tablet} {
    grid-row-start: 1;
    grid-row-end: span dropped;

    .detail__label {
      display: inline-block;
      margin-right: 15px; 
    }

    .detail__value {
      background-color: #1e385a;
      border-radius: 50px;
      color: #66a7f2;
      display: inline-block;
      font-size: 11px;
      font-weight: 700;
      height: 32px;
      line-height: 32px;
      text-align: center;
      width: 32px;
    }
  }
  `;

const mapStateToProps = ({ app }: any) => ({
  selectedCurrency: app.selectedCurrency,
  cryptoRequestState: app.cryptoRequestState
})

interface SingleCryptoProps {
  rank: number,
  currency: Crypto,
  selectedCurrency: string,
  cryptoRequestState: string
}

export const SingleCryptoPage = ({ rank, currency, selectedCurrency, cryptoRequestState }: SingleCryptoProps) => {
  const notLoaded = cryptoRequestState === Status.NOT_LOADED || cryptoRequestState === Status.LOADING;
const placeholder = {
  name: "BTC",
  price: ("00000.00").toLocaleString(),
  marketCap: ("0000000").toLocaleString(),
  circulatingSupply: ("10000000").toLocaleString(),
  selectedCurrencySymbol: "$"
};

  return (
    <StyledPage data-test="component-crypto">
      <div className="wrapper">
        <StyledDetailTaller>
          <p className="detail__label">{"RANK"}</p>
          <p className="detail__value">{notLoaded ? "#" : rank}</p>
        </StyledDetailTaller>
        <StyledDetail >
          <p className="detail__label">{"MARKET CAP"}</p>
          <p className="detail__value"><span className="detail__value--currency">{currency.selectedCurrencySymbol}</span> {currency.marketCap}</p>
        </StyledDetail>
        <StyledDetail>
          <p className="detail__label">{"24 HOUR VOLUME"}</p>
          <p className="detail__value"><span className="detail__value--currency">{currency.selectedCurrencySymbol}</span> {currency.volume24Hour}</p>
        </StyledDetail>
        <StyledDetail>
          <p className="detail__label">{"CIRCULATING SUPPLY"}</p>
          <p className="detail__value">{currency.circulatingSupply} <span className="detail__value--crypto">{currency.name}</span></p>
        </StyledDetail>
      </div>
    </StyledPage>
  );
};


export default connect(mapStateToProps)(SingleCryptoPage);
