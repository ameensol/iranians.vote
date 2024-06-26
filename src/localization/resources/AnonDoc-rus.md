# Freedom tools
## Solution for electronic voting

Jan 2024

***Abstract.*** This paper presents an in-depth examination of
sophisticated methodologies and technological frameworks essential for constructing a robust digital voting system. Our
comprehensive analysis encompasses several critical stages: establishing individualized voter profiles utilizing
biometric passport data, generating and verifying eligibility credentials, and implementing Verifiable Credentials for
authentication. Furthermore, we delve into the intricacies of polling creation, the compilation of voter registries,
the complexities of the voting procedure, and the methodologies for result calculation. Additionally, we offer a
detailed discourse on security assertions and assumptions to ensure the utmost integrity and security throughout the
voting process.

## Profile creation
First of all, often, voting systems must rely on some infrastructure that is a source of information about the
realness, uniqueness, and eligibility of voters. Finding a source that confirms all three properties is, in some cases
(including during elections in authoritarian countries), quite tricky. Take state elections, for example:

- Uniqueness and realness can rely on biometric data or, more precisely, the methods and protocols that require them.
- Eligibility (citizenship and age) is more difficult since the state is the only source confirming such parameters.

### Passport as user’s identity setup
A biometric passport is a means of providing these three properties (we will touch on the issues of falsifying
passports and the possibility of printing them by the state later) - it confirms citizenship (eligibility), stores
information about a person’s age (eligibility), and through the passport number provides a unique identifier
(uniqueness). Additionally, it stores information about the authority that issued it (realness). Moreover, the
additional capabilities of biometric passports (including implementing some cryptographic methods) make it a fairly
reliable tool for organizing elections.

Hereinafter, when we use the word passport, we refer to biometric passports implementing the Doc 9303 Machine Readable
Travel Documents standard [1].

### Reading and decrypting the data from the passport
To create a profile, the user must submit or ‘read’ the passport information. To do this, the user can use his mobile
phone with an RFID reader (hereinafter, we will use “**device**”). The reading process consists of the following steps:
1. Generate keys for authentication and receiving the data from the passport.
2. Receive data from the passport and verify it locally.
3. Store the relevant passport data locally on the device.

<img src="images/tech-doc-en/1.png"/>

For generating authentication keys and receiving data from the passport chip:
1.  The device scans the passport's Machine Readable Zone (**MRZ**) using the camera.
2. The device derives Document Basic Access Keys (**K<sub>**Enc**</sub>** and **K<sub>MAC</sub>**).
3.  Devices with the chip authenticate keys to each other and derive KS<sub>Enc</sub>** and **KS<sub>MAC</sub>**
    session keys.

These keys authenticate and encrypt messages between the device and the passport. The device reads the data from the
chip and verifies it locally:
1.  The device reads the Document Security Object (**SOD**) and receives the Document Signer Certificate (**CDS**) -
    the public key certificate of the party that issued and validated the passport.
2.  The device builds and validates the certification path from the Trust Anchor (Certificate Authority) to CDS by the
    verification of the signature that covers SOD.
3.  The device reads Data Groups (**DGs**) from the passport.
4.  The device verifies that all DGs are authentic and integer by comparing hashes of all DGs with corresponding hash
    values in the SOD.

If all verifications are performed correctly - it means that the device scanned the valid passport, so the device
stores the following list of data:
1.  DG1: Personal Details. This includes the primary biographical information of the passport holder, such as name,
    date of birth, nationality, and passport number. It reflects much of the information printed on the passport's data
    page.
2.  DG2: Facial photograph. This contains the portrait of the passport holder. In the future, it will be possible to
    extend the protection method based on it with face recognition and ZKML proofs.
3.  DG7: Signature/Image of Holder. This data group stores the scanned image of the passport holder’s signature.
4.  DG15: Active Authentication Public Key. This includes the public key used for active authentication, a security
    feature to prevent unauthorized copying of passport data.
5.  Hash values of other DGs.
6.  Signature of the Document that covers SOD (hash values of all DGs).
7.  Document Signer Certificate (CDS).

Let’s note that in the future (or for some countries right now), the list of biometric data groups can be extended;
DG2 and DG7 (the portrait and the photo of a physical signature) are currently the most supportable biometrics in
passports.

All actions within this process are performed locally, without access to the Internet (the certificate path can also be
verified on the device if the application stores the set of valid certificates of Trust Anchors). No personal data is
shared anywhere or accessible to outside parties.

*Note. We have named this process “profile entering”, because the processes of registration, login, and recovery are
absent. Users can enter their unique profile only using the biometric passport and only by reading data from it.*

### Creating the keys for digital identity
Now, the user should generate the keypair for identity management. The proof of the user’s eligibility will be
connected to the created identity, and keys will be used to confirm the user’s actions on smart contracts. You can
imagine it as a grant issued by the user and delegating their representation rights on the web3 layer.

For the mentioned purposes (and for MITM protection), the user should confirm that the defined key is generated and
controlled by them. And they again use a passport or a rather active authentication flow to make that possible.

This flow consists of generating a challenge and signing it with a private key stored in a secure segment of the
passport. The corresponding public key is located in DG15. Instead of a challenge, the user provides the generated DID
and asks to sign it. You can think of this as a self-signed PK certificate signed using the passport’s secret.

<img src="images/tech-doc-en/2.png" />

Thus, when transferring DID to an external consumer (identity provider or smart contract), the verifier will be sure
that the user controls the keys to his identity. DID is generated based on the Iden3 standard[2].

### Generating the proof of eligibility
Once a local voting profile has been created, it must be tied to publicly verifiable credentials, which on-chain
contracts can verify without disclosing personal data. We define eligibility verification as follows:
1.  Verifying that the passport was issued by one of the authorized authorities (SOD signature verification).
2.  Checking that the DG1 group includes a field with a specific citizenship.
3.  Checking that the DG1 group includes a field with a date of birth that meets the necessary criteria (18+).
4.  Checking that the passport isn’t expired.
5.  Verifying that DG1, which holds personal data, data and the DGs, which hold the biometric data are included in the
    SOD.
6.  Verifying that DG15 is included in the SOD and that the user has used the correct private key to sign the DID
    (passport control).

All these checks can be performed on contracts, but some of the data will be published (and generating the
corresponding proofs is a rather difficult task for user devices). Therefore, the user must contact one of the identity
providers and satisfy the specified verification (however, without actually disclosing critical information).

To do this, the user selects one of the providers and sends them the following set of data:
- DID + signature by the passport secret key.
- Authentication public key (DG15).
- DG1, DG2 and DG7 hashes.
- The proof of DG1, DG2, DG7, and DG15 are included in SOD (all other hashes or zkp).
- The zero-knowledge proof of citizenship is included in DG1.
- The zero-knowledge proof that the user is older than 18: the defined date of birth in the DG1 is lower than some
  threshold.
- The zero-knowledge proof that the expiration date in DG1 isn’t met.
- The signature of the SOD and Document Signer Certificate (CDS).

<img src="images/tech-doc-en/3.png" />

## Receiving the Verifiable Credential
The Identity Provider starts the verification procedure when it receives the aforementioned dataset. If all checks
(discussed above) were performed correctly - the Identity Provider issues the Verifiable Credential (**VC**) based on
the W3C standards\[3\] to the user. VC consists of:
- The Poseidon hash values of DG2 and DG7 hashes.
- The signature of SOD generated by the certificate authority.
- Document Signer Certificate (CDS).
- Credential expiration date.

<img src="images/tech-doc-en/4.png" />

This data is stored on the user’s device. At the same time, the identity provider stores:
- SOD data
- Poseidon hash values of DG2 and DG7 hashes
- The signature of SOD is generated by the certificate authority.
- Document Signer Certificate (CDS).

If state misbehavior occurs, this data can be used to prove it. The attack vectors and protection methods are
discussed below (in the section with vote registration).

As a basic platform for Verifiable Credential issuance - we propose to use the Rarimo protocol[4]. This protocol allows
VCs to be issued with the ability to transfer them to the needed blockchain later. It’s a very important property because
the voting organizer can have no idea where the final voting process will be performed but wants to allow users to be
registered in advance. Rarimo allows the transfer of the global identity state by one crosschain message but not to
transfer each VC separately. At the same time, the process is completely decentralized - only the needed quorum of Rarimo
validators (threshold) must sign the message to confirm it on the destination network.

The mentioned approach allows for building voting pools in a flexible way by separating different processes and receiving
the maximum value from combining technologies and networks (some of them can provide unique opportunities for organizing
the voting procedure exactly on their technical stack - like grants, etc).


## Pool creation

In this section, we will look at how exactly a pool instance is created. By instance, we mean a set of contracts that
allow users to go through the voting procedure, from creating relayer reward pools and registering in the voting
registry to anonymous voting and calculating the results.

### Components of the voting contract infrastructure
Anyone can create a pool. To do so, you must call the pool factory method and pass the necessary parameters. Calling
the method initiates the creation of 3 contract systems:
1.  Contract for investment in voting (INV). It is needed to collect funds to compensate for the confirmation of user
    transactions by independent proxy nodes.
2.  Contract for registering voters in the pool (REG). It is needed to verify user ownership of the necessary VCs and
    add an anonymous entity to the register of voters.
3.  Voting Contract (VOT). It’s needed to send anonymous votes and count voting results.

<img src="images/tech-doc-en/5.png" />

## Voting parameters

To initiate the creation of contracts, you need to define the following parameters:
1.  The time frame for the functioning of each of the contracts. It is important to understand that contracts are
    involved in various voting stages and executed in the sequence INV-\>REG-\>VOT-\>INV. At the end of each stage, a
    condition may block the contract from participating in the next stage.
2.  The total number of voters (maximum) and **minimal acceptable threshold** - the minimum threshold of the total
    number of voters; upon reaching the number of registrations, a decision will be made (automatically) to vote. The
    minimum number of voters required to decide is also separately determined (the number of registered parties may exceed
    the number of actual voters).
3.  The estimated average cost of transactions interacting with contracts: registration in the pool and voting.
4.  Relayers reward rate. This parameter can also be adjusted depending on the amount of investment in the INV and the
    number of voters.
5.  Voting and other options (including multiple choice options).
6.  The list of trusted Identity Providers who can issue VCs to voters and confirm their eligibility.
7.  The needed VC types (schemas).

### Contracts initiating flow
The softcap and hardcap values defined in the INV contract will be calculated depending on the set parameters. Upon
reaching the launch date of the crowdfunding company, you can call the appropriate method in the INV contract and
deposit the desired amount of funds. Funds will be automatically distributed between pools depending on the ratio of
transaction costs.

If, upon reaching the company's completion time, the softcap has not been reached, the contract for registration is
not deployed, and the funds are returned to investors. If, at the time of completion of the company, the softcap was
reached (or the hardcap was reached in advance), this initiates the creation of a REG contract.

After the registration start date, users themselves (or using relayers) can call a method to add them to the voting
list (the list is anonymous, but more on that later). At the same time, users define secret parameters that will allow
them to prove in the future that they were added to the list. At this stage, the output of the registration process
is a list of registered voters. Suppose the number of registered users does not exceed a certain minimal acceptable
threshold. In that case, the deployment of the contract for the actual voting is rejected (for reasons that this may
additionally affect the de-anonymization of users). However, depending on the number of confirmed transactions,
relayers can refund funds from the INV contract.

The VOT contract is automatically deployed if the minimal acceptable threshold is reached. Using this contract, the
user can already send the final vote with proof of registration. The same contract calculates the final voting results
unless there is an option to disclose the results only after the voting procedure has been carried out (however, such a
procedure requires a trusted setting of the threshold key for encrypting votes and is optional).

### How does the user find the required pool?
To provide the user with information about the voting pool, it is enough to provide the address of the master contract
and the pool identifier (for example, in the form of a QR code). The application must support the correct interface
for communication with appropriate contract methods.

## Relayers
In conditions where we want to combine the usage of decentralized systems and provide voting rights to every eligible
person, there is a list of challenges we need to solve:
1.  Users must perform auditable and protected actions that are timestamped and can not be deleted or modified. Now,
    it’s possible with public blockchains (using transactions with appropriate smart contract calls).
2.  Users don’t want (or can’t) to pay a transaction fee. Moreover, some users (the majority) don’t know about web3 -
    installing MM and buying the native currency is an additional challenge for them.
3.  Some services could send transactions instead of users (they can’t modify signatures or proof). Setuping the
    single relayer service is a possible but unreliable solution (a high probability of DoS).
4.  Allowing any interested party to relay users’ transactions is possible. But obviously, these relayers don’t want to
    pay for someone else if it’s not profitable.

While decentralized relayers seem promising, a critical question arises: can we build a scheme where proxy services
receive some rewards or benefits when they confirm users’ transactions?

At the same time, some organizations (we will call them **investors** below) could provide grants under the following
conditions:
- Investors must be interested in actions performed by end users (involving a big audience in some process, like
  voting).
- Investors must be sure that provided funds are distributed reasonably and proportionally to the involvement of
  relayers.
- Investors must be able to check that relayers receive rewards only for doing the right actions (confirming valid
  transactions that call corresponding methods of some smart contract) and only after they confirm it.

Investors, who function as crowdfunding in this context, are willing to provide financial support with the expectation
of conducting a fair voting event. To address this challenge, it is imperative to devise a solution that benefits
users, proxy services, and investors alike, ensuring each participant finds value within this interconnected cycle.

Let’s see how it works as a component of our voting tools.

### Relayers’ incentivizing
Pre-requirements:
- There is a voting event where we want a lot of voters (not only web3).
- The voting contract exists on the public blockchain, and each transaction with the vote requires a fee payment.
- We know the approximate number of users - “**EXPECTED_NUM_VOTERS**”.
- We know the average vote price - “**AVG_VOTE_PRICE**”.
  - The average vote price can be calculated as (amount of gas for the
    vote) \* (average gas price for some time).
  - In the case of big elections, it can affect the total performance of the particular network and increase the
    average vote price (by competing for a place in the block).
- Additionally, some multiplier could be set - it displays the profitability of confirming the particular vote by the
  relayer “**INCENTIVE_COEFF**”.

The solution for relayers works the following way:
1.  The process starts with creating the pool with rewards, which will be distributed between relayers. The following
    parameters are used for the pool creation:
  1.  Date and time where voting starts (or the date and time of registration procedure if it exists)
  2.  Softcap = **EXPECTED_NUM_VOTERS \* AVG_VOTE_PRICE \* INCENTIVE_COEFF**
    1.  The minimum amount of funds needed to start the voting process.
  3.  Hardcap (if needed)
    1.  The maximum amount of funds needed to start the voting process.
  4.  Voting contract parameters (contract address, methods’ names, etc).
2.  Then, investors can donate funds into the pool if they agree to all defined data. The donation process looks like a
    crowd-investing campaign: the voting procedure starts only if the soft cap is reached. Funds are returned to investors'
    accounts if the soft cap isn’t reached during the voting procedure.

<img src="images/tech-doc-en/6.png" />

3.  When the voting process starts, users generate valid votes (they can be anonymous) with signatures/proofs and send
    them to relayers. They can send votes to predefined relayers they trust or send the proof to the network, where any
    relayer can take it and finally submit it to the blockchain.

> <img src="images/tech-doc-en/7.png" />

4.  In these conditions, it’s not profitable for relayers to wait until they can receive MEV based on the cost of
    transaction confirmation if the current fee is lower than the reward they receive from the investing pool (this amount
    is clear and visible to everyone). Any node that sends the transaction - will receive the profit.
  1.  Relayers can compete with each other - it’s OK. The most important thing - is the existence of at least one
      node that can extract the value from the confirmed transaction.
  2.  Potentially, relayers can agree, confirm only one transaction, and divide the revenue between all relayers
      (without paying fees). Still, they can’t trust each other that someone will not confirm other transactions and not
      increase their share in the pool.
  3.  During the voting, there might be a point when submitting transactions for relayers becomes unprofitable as the
      total pool rewards are lower than the total gas cost of transactions. Proxies might continue submitting
      transactions to get bigger shares and decrease losses. But it’s better to have a basic **INCENTIVE_COEFF** that is
      reasonable and calculated the proper way.
  4.  Each proxy creates a strategy for how and when to send transactions to extract maximum value. But it’s better
      not to wait - any confirmed transaction increases the share in the pool and potentially leads to higher rewards.
5.  After the voting process has ended, the reward pool is shared among all accounts that have submitted transactions
    during the voting procedure. The share size depends on the amount of submitted transactions.
  1.  Each relayer must initiate the rewards claim, but the contract can automatically calculate which EOAs submitted
      needed transactions.

<img src="images/tech-doc-en/8.png" />

Also, there is a general description of how the web3 operations can be refunded. But sometimes, the amount of
transactions within some process is more significant than one. For example, freedom tools require:
- Transaction for creation VC (potentially could be paid by identity providers).
- Transaction for registration into the voting pool (should be sent by relayers).
- Transaction with a vote (also should be sent by relayers).

The cost of transactions on steps is different, so dividing the pool into two sub-pools with the relation depending on
the transaction types sent by relayers makes sense.

In any way, the described approach isn’t a pill that replaces interaction between users and blockchains. It only opens
doors for using blockchain capabilities by users who don’t use wallets and aren’t too much in the web3 area.
Interestingly, each user can act as a relayer if they wish - in this case, they will also be refunded for their
transactions.

The relayers method strongly answers the difficulties faced in on-chain decentralized voting. It incorporates
crowdfunding from investors to overcome user hesitation in covering transaction expenses. This approach establishes a
minimum limit for voters, sets a flexible target for crowdfunding, and guarantees that the voting only starts when
there is enough public backing. During the vote, participants send their transactions through intermediaries. The
reward pool formed as a result is then shared according to the volume of transactions. This strategy effectively
addresses transaction cost concerns while promoting greater involvement and innovation. It offers an attractive option
for managing on-chain decentralized voting within the blockchain sphere.

## Registration as a voter in the pool
This procedure is intended to anonymize user votes subsequently - ultimately, no one can link adding transactions to
the voting list with transactions with votes[5]. To add a user to the registry, follow these steps:
1.  The user generates **Nullifier** and **Secret** - two private values.
2.  The user calculates **Identifier** = Poseidon(Nullifier, Secret).
3.  The user sends proof that they have a right to vote (valid and not expired Verifiable Credential) and the list of
    the following data:
  1.  The Poseidon hash values of DG2 and DG7 hashes. This data is required to check the user's uniqueness and can be
      used as fraud-proof if somebody wants to corrupt the user’s vote.
  2.  The proof of knowledge of DG2 and DG7 hash values. For that user must use the data from the passport’s SOD.
  3.  The signature of SOD is generated by the certificate authority.
  4.  Document Signer Certificate (CDS).
4.  The user provides an Identifier, which is added to the incremental Merkle Tree list (if all verifications are
    passed).
5.  The Root of the Merkle tree is being updated.

<img src="images/tech-doc-en/9.png" />

At this stage, it should be noted that the user must save the Nullifier and Secret values on the device - knowing them
will allow the user to vote at the final stage. It is important to note that after adding a leaf to the tree, the user
can delete all data associated with his passport and even use a separate device that did not access his passport data
for the final voting stage. All he needs for this is knowledge of Nullifier and Secret.

## Voting process
To send the vote, the user needs to perform the following actions:
1.  To form the ballot body, representing the selected voting option (Vote).
2.  Calculate the Merkle branch for the leaf added due to user registration.
3.  Calculate zero-knowledge proof:
  1.  Nullifier, Merkle Root, and Vote as public inputs;
  2.  Identifier, Merkle Branch, and Secret are private inputs.
  3.  Verification logic is:
    1.  Identifier == Poseidon(Nullifier, Secret);
    2.  Identifier inclusion into the Merkle Tree with the corresponding Root using the Merkle Branch.
4.  Aggregates the proof along with the body of the ballot and sends them to one of the relayers. The relayer packages
    the proof ballot into a transaction and sends it to the network.
5.  The VOT contract verifies the proof and takes into account the vote if it is correct.

<img src="images/tech-doc-en/10.png" />

> Note: the Vote parameter does not participate directly in the verification process. It is used to add a constraint and
bind the Vote to the proof. Changing the vote will make the whole proof invalid. Otherwise, malicious parties could
intercept a proof and replace a Vote with a new one.

## Calculation of results
The voting results are stored by the corresponding smart contract state. Suppose the permissionless blockchain is used
as an infrastructure for pool deployment. In that case, it means that anyone can check it and be sure that the final
result corresponds to all performed transactions.

There is a mode that allows hiding voting results before it finishes. This approach requires a trusted setup between
the quorum of participants. This quorum forms the public key for encrypting votes by the end users. When the voting
procedure is finished, these parties can reveal their secrets, and anyone (if the threshold is met) can decrypt
votes and calculate the final voting result.

If results are open constantly, the additional logic can be built based on the final state of the voting contract, for
example, launching some action. An encryption option is also possible, but it requires a more complex solution, like
homomorphic encryption.

## Security claims and assumptions
There is a list of security claims and assumptions Freedom tools include:
- Only the person who physically owns a biometric passport can confirm the ownership of DID.
- Only registered users on the REG contract (with appropriate tree leaves) can participate in the voting.
- Registering and voting can be performed on separate devices (through exporting Nullifier and Secret). In this case,
  the terminal for voting knows nothing about the person except they have a right to vote.
- Users can’t vote twice using the same leaf in the tree.
- Users can’t be registered in the pool using the same hashes of any biometry credential or with the same signature
  from the certificate authority.
- If the authentication key was replaced in the passport duplicate - the real owner can prove it and discredit the
  certificate authority.
- The vote can be sent only with the knowledge of the corresponding Nullifier and Secret. If the user lost it - there
  is no way to recover the vote.
- The vote can't be sent if the Nullifier or Secret is unknown.
- It’s impossible to replace the ballot body in the vote while keeping the consistency of the proof.
- There isn’t a way to track a connection between registration and voting if different EOAs / relayers were used.
- Identity providers can’t recover users’ personal data without having access to appropriate databases (dictionary
  attack).

## Links

[1] Doc 9303 Machine Readable Travel Documents
[2] Iden3
[3] W3C
[4] Rarimo
[5] Tornado Cash
