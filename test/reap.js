const reapToken = artifacts.require('reapToken.sol');


const { increaseTimeTo, duration } = require('openzeppelin-solidity/test/helpers/increaseTime');
const { latestTime } = require('openzeppelin-solidity/test/helpers/latestTime');

var Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var Web3Utils = require('web3-utils');

contract('reapToken Contract', async (accounts) => {


    it('Should correctly initialize constructor of reapToken token Contract', async () => {

        this.tokenhold = await reapToken.new(accounts[0], { gas: 600000000 });

    });

    it('Should check a name of a token', async () => {

        let name = await this.tokenhold.name.call();
        assert.equal(name, "Reap");

    });

    it('Should check a symbol of a token', async () => {

        let symbol = await this.tokenhold.symbol.call();
        assert.equal(symbol, "Reap");

    });

    it('Should check a decimal of a token', async () => {

        let decimals = await this.tokenhold.decimals.call();
        assert.equal(decimals, 18);

    });

    it('Should check a owner of a token', async () => {

        let owner = await this.tokenhold.owner.call();
        assert.equal(owner, accounts[0]);

    });

    it('Should check if contract is paused or not', async () => {

        let paused = await this.tokenhold.paused.call();
        assert.equal(paused, false);

    });

    it('Should check if presale end or not', async () => {

        let preSaleEnd = await this.tokenhold.preSaleEnd.call();
        assert.equal(preSaleEnd, false);

    });

    it('Should check if presale investor or not', async () => {

        let preSaleInvestor = await this.tokenhold.preSaleInvestor.call(accounts[0]);
        assert.equal(preSaleInvestor, false);

    });

    it('Should check total supply of reap contract', async () => {

        let totalSupply = await this.tokenhold.totalSupply();
        assert.equal(totalSupply.toString(), 250000000000000000000000000000);

    });

    it('Should check total released ', async () => {
        totalReleased = await this.tokenhold.totalReleased.call();
        assert.equal(totalReleased.toString(), 125000000000000000000000000000);

    });

    it('Should check staking tokens in contract ', async () => {
        stakingTokens = await this.tokenhold.stakingTokens.call();
        assert.equal(stakingTokens.toString(), 125000000000000000000000000000);

    });

    it('Should check tokenForSale in contract ', async () => {
        tokenForSale = await this.tokenhold.tokenForSale.call();
        assert.equal(tokenForSale.toString(), 125000000000000000000000000000);

    });

    it('Should check the balance of a Owner', async () => {

        let balanceOfOwner = await this.tokenhold.balanceOf(accounts[0]);
        assert.equal(balanceOfOwner, 125000000000000000000000000000);

    });

    it('Should check the balance of a contract', async () => {

        let balanceOfOwner = await this.tokenhold.balanceOf(this.tokenhold.address);
        assert.equal(balanceOfOwner, 125000000000000000000000000000);

    });

    it('Should check the balance of a account 1 before sending tokens to presale investor', async () => {

        let balanceOfOwner = await this.tokenhold.balanceOf(accounts[1]);
        assert.equal(balanceOfOwner, 0);

    });

    it('Should check if investor is presale investor or not before sending', async () => {

        let preSaleInvestor = await this.tokenhold.preSaleInvestor(accounts[1]);
        assert.equal(preSaleInvestor, false);

    });

    it('Should check if investor has presale funds', async () => {

        let preSaleInvestorFunds = await this.tokenhold.preSaleInvestorFunds(accounts[1]);
        assert.equal(preSaleInvestorFunds, 0);

    });

    it('Should check if investor has claimed any token before sale', async () => {

        let claimedTokens = await this.tokenhold.claimedTokens(accounts[1]);
        assert.equal(claimedTokens, 0);

    });

    it('Should check total pre sale investor before adding any presale investor', async () => {

        let totalPreSaleInvestors = await this.tokenhold.totalPreSaleInvestors.call();
        assert.equal(totalPreSaleInvestors, 0);

    });

    it('Should check presale end time is zero', async () => {

        let preSaleEndTime = await this.tokenhold.preSaleEndTime.call();
        assert.equal(preSaleEndTime, 0);

    });

    it('Should send sales tokens to user', async () => {

        await this.tokenhold.sendPreSaleTokens(accounts[1], web3.utils.toHex(100 * 10 ** 18));


    });

    it('Should check the balance of a contract', async () => {

        let balanceOfOwner = await this.tokenhold.balanceOf(this.tokenhold.address);
        assert.equal(balanceOfOwner.toString(), 125000000000000000000000000000);

    });

    it('Should check the balance of a account 1 before sending tokens to presale investor', async () => {

        let balanceOfOwner = await this.tokenhold.balanceOf(accounts[1]);
        assert.equal(balanceOfOwner / 10, 0);

    });

    it('Should check if investor is presale investor or not after sending', async () => {

        let preSaleInvestor = await this.tokenhold.preSaleInvestor(accounts[1]);
        assert.equal(preSaleInvestor, true);

    });

    it('Should check if investor has presale funds', async () => {

        let preSaleInvestorFunds = await this.tokenhold.preSaleInvestorFunds(accounts[1]);
        assert.equal(preSaleInvestorFunds.toString(), 100000000000000000000);

    });

    it('Should check if investor has claimed any token before sale', async () => {

        let claimedTokens = await this.tokenhold.claimedTokens(accounts[1]);
        assert.equal(claimedTokens, 0);

    });

    it('Should check total pre sale investor before adding any presale investor', async () => {

        let totalPreSaleInvestors = await this.tokenhold.totalPreSaleInvestors.call();
        assert.equal(totalPreSaleInvestors.toString(), 1);

    });

    it('Should send sales tokens to user account 2', async () => {

        await this.tokenhold.sendPreSaleTokens(accounts[2], web3.utils.toHex(100 * 10 ** 18));


    });

    it('Should check the balance of a contract', async () => {

        let balanceOfOwner = await this.tokenhold.balanceOf(this.tokenhold.address);
        assert.equal(balanceOfOwner.toString(), 125000000000000000000000000000);

    });

    it('Should check the balance of a account 1 before sending tokens to presale investor', async () => {

        let balanceOfOwner = await this.tokenhold.balanceOf(accounts[2]);
        assert.equal(balanceOfOwner, 0);

    });

    it('Should check if investor is presale investor or not after sending', async () => {

        let preSaleInvestor = await this.tokenhold.preSaleInvestor(accounts[2]);
        assert.equal(preSaleInvestor, true);

    });

    it('Should check if investor has presale funds', async () => {

        let preSaleInvestorFunds = await this.tokenhold.preSaleInvestorFunds(accounts[2]);
        assert.equal(preSaleInvestorFunds.toString(), 100000000000000000000);

    });

    it('Should check if investor has claimed any token before sale', async () => {

        let claimedTokens = await this.tokenhold.claimedTokens(accounts[2]);
        assert.equal(claimedTokens, 0);

    });

    it('Should check total pre sale investor before adding any presale investor', async () => {

        let totalPreSaleInvestors = await this.tokenhold.totalPreSaleInvestors.call();
        assert.equal(totalPreSaleInvestors.toString(), 2);

    });

    it('Should send sales tokens to user account 3', async () => {

        await this.tokenhold.sendPreSaleTokens(accounts[3], web3.utils.toHex(100 * 10 ** 18));


    });

    it('Should check the balance of a contract', async () => {

        let balanceOfOwner = await this.tokenhold.balanceOf(this.tokenhold.address);
        assert.equal(balanceOfOwner.toString(), 125000000000000000000000000000);

    });

    it('Should check the balance of a account 1 before sending tokens to presale investor', async () => {

        let balanceOfOwner = await this.tokenhold.balanceOf(accounts[3]);
        assert.equal(balanceOfOwner, 0);

    });

    it('Should check if investor is presale investor or not after sending', async () => {

        let preSaleInvestor = await this.tokenhold.preSaleInvestor(accounts[3]);
        assert.equal(preSaleInvestor, true);

    });

    it('Should check if investor has presale funds', async () => {

        let preSaleInvestorFunds = await this.tokenhold.preSaleInvestorFunds(accounts[3]);
        assert.equal(preSaleInvestorFunds.toString(), 100000000000000000000);

    });

    it('Should check if investor has claimed any token before sale', async () => {

        let claimedTokens = await this.tokenhold.claimedTokens(accounts[3]);
        assert.equal(claimedTokens, 0);

    });

    it('Should check total pre sale investor before adding any presale investor', async () => {

        let totalPreSaleInvestors = await this.tokenhold.totalPreSaleInvestors.call();
        assert.equal(totalPreSaleInvestors.toString(), 3);

    });

    it('Should be able to end presale', async () => {

        await this.tokenhold.endPreSale();


    });

    it('Should check if presale end or not', async () => {

        let preSaleEnd = await this.tokenhold.preSaleEnd();
        assert.equal(preSaleEnd, true);

    });

    it('Should be able to check cycle ', async () => {

        let getCycle = await this.tokenhold.getCycle();
        assert.equal(getCycle, 1);

    });

    it('Should claim tokens', async () => {

        await this.tokenhold.claimToken({ from: accounts[2] });


    });

    it('Should check the balance of a account 2', async () => {

        let balanceOfOwner = await this.tokenhold.balanceOf(accounts[2]);
        assert.equal(balanceOfOwner.toString(), 1000000000000000000);

    });

    it('Should be able to check cycle ', async () => {

        this.openingTime = (await latestTime());
        console.log(this.openingTime);
        let value = await increaseTimeTo(this.openingTime + duration.seconds(120));
        this.openingTimes = (await latestTime());
        console.log(this.openingTimes);
        let getCycle = await this.tokenhold.getCycle();
        assert.equal(getCycle, 2);

    });

    it('Should claim tokens', async () => {

        await this.tokenhold.claimToken({ from: accounts[2] });


    });

    it('Should not be able to claim tokens in same cycle', async () => {
        try {
            await this.tokenhold.claimToken({ from: accounts[2] });
        } catch (error) {
            var error_ = 'Returned error: VM Exception while processing transaction: revert';
            assert.equal(error.message, error_, 'Reverted ');
        }

    });

    it('Should check the balance of a account 2', async () => {

        let balanceOfOwner = await this.tokenhold.balanceOf(accounts[2]);
        assert.equal(balanceOfOwner.toString(), 2000000000000000000);

    });

    it('Should be able to check cycle ', async () => {

        this.openingTime = (await latestTime());
        console.log(this.openingTime);
        let value = await increaseTimeTo(this.openingTime + duration.seconds(60));
        this.openingTimes = (await latestTime());
        console.log(this.openingTimes);
        let getCycle = await this.tokenhold.getCycle();
        assert.equal(getCycle, 3);

    });

    it('Should claim tokens', async () => {

        await this.tokenhold.claimToken({ from: accounts[2] });


    });

    it('Should check the balance of a account 2', async () => {

        let balanceOfOwner = await this.tokenhold.balanceOf(accounts[2]);
        assert.equal(balanceOfOwner.toString(), 3000000000000000000);

    });

    it('Should be able to check cycle ', async () => {

        this.openingTime = (await latestTime());
        console.log(this.openingTime);
        let value = await increaseTimeTo(this.openingTime + duration.seconds(60));
        this.openingTimes = (await latestTime());
        console.log(this.openingTimes);
        let getCycle = await this.tokenhold.getCycle();
        assert.equal(getCycle, 4);

    });

    it('Should claim tokens', async () => {

        await this.tokenhold.claimToken({ from: accounts[2] });


    });

    it('Should check the balance of a account 2', async () => {

        let balanceOfOwner = await this.tokenhold.balanceOf(accounts[2]);
        assert.equal(balanceOfOwner.toString(), 4000000000000000000);

    });

    it('Should be able to check cycle ', async () => {

        this.openingTime = (await latestTime());
        console.log(this.openingTime);
        let value = await increaseTimeTo(this.openingTime + duration.seconds(5400));
        this.openingTimes = (await latestTime());
        console.log(this.openingTimes);
        let getCycle = await this.tokenhold.getCycle();
        assert.equal(getCycle, 100);

    });

    it('Should claim tokens', async () => {

        await this.tokenhold.claimToken({ from: accounts[2] });


    });

    it('Should check the balance of a account 2', async () => {

        let balanceOfOwner = await this.tokenhold.balanceOf(accounts[2]);
        assert.equal(balanceOfOwner.toString(), 100000000000000000000);

    });


})

