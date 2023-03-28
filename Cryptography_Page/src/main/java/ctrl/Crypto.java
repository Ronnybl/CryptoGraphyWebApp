package ctrl;

import java.io.IOException;
import java.io.Writer;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.PublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.RSAPublicKeySpec;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.Key;
import java.security.KeyFactory;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import util.CryptoTools;

/**
 * Servlet implementation class Crypto
 */
@WebServlet({"/Crypto","/Crypto/*"})
public class Crypto extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Crypto() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		Writer resOut = response.getWriter();
		String output = "Error: Nothing Was Provided";
		if(request.getParameter("cryptomethod") != null && request.getParameter("cryptomethod").equals("asymmetric")) {
			if(request.getParameter("method") != null) {
				String method = request.getParameter("method");
				output = method + "=" + asymmetricFunctions(method, request);
			}
		}
		else if (request.getParameter("cryptomethod") != null && request.getParameter("cryptomethod").equals("foundation")) {
			if(request.getParameter("method") != null) {
				String method = request.getParameter("method");
				output = method + "=" + foundationFunctions(method, request);
			}
		}
		else if (request.getParameter("cryptomethod") != null && request.getParameter("cryptomethod").equals("symmetric")) {
			if(request.getParameter("method") != null) {
				String method = request.getParameter("method");
				output = method + "=" + symmetricFunctions(method, request);
			}
		}
		response.setContentType("application/json");
		output = ("{\"output\":" + "\"" + output+ "\"" + "}");
		resOut.write(output);
		resOut.flush();
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}
	
	private String asymmetricFunctions(String method, HttpServletRequest request) {
		String methodChosen = method.toLowerCase();
		if(methodChosen.equals("ea")) {
			if (request.getParameter("bigx") != null && request.getParameter("bigy") != null) {
				try {
					BigInteger x = new BigInteger(request.getParameter("bigx"));
					BigInteger y = new BigInteger(request.getParameter("bigy"));
					return "" + euclideanAlgo(x, y);
				}
				catch (NumberFormatException e) {
					return "Number Format Exception Caught";
				}
			}
			else {
				return "No input provided";
			}
		}
		else if(methodChosen.equals("eea")) {
			if (request.getParameter("bigx") != null && request.getParameter("bigy") != null && 
					request.getParameter("bigx1") != null && request.getParameter("bigy1") != null) {
				try {
					BigInteger x = new BigInteger(request.getParameter("bigx"));
					BigInteger y = new BigInteger(request.getParameter("bigy"));
					BigInteger x1 = new BigInteger(request.getParameter("bigx1"));
					BigInteger y1 = new BigInteger(request.getParameter("bigy1"));
					return "" + extendedEuclideanAlgo(x, y, x1, y1);
				}
				catch (NumberFormatException e) {
					return "Number Format Exception Caught";
				}
			}
			else {
				return "No input provided";
			}
		}
		else if(methodChosen.equals("rsa")) {
			if (request.getParameter("text") != null && request.getParameter("n") != null) {
				BigInteger n = new BigInteger(request.getParameter("n"));
				if (request.getParameter("process") != null && request.getParameter("process").equals("e")) {
					if (request.getParameter("e") != null) {
						String text = request.getParameter("text");
						BigInteger e = new BigInteger(request.getParameter("e"));
						try {
							return rsaEncrypt(text, e, n);
						} catch (InvalidKeyException | IllegalBlockSizeException | BadPaddingException
								| NoSuchAlgorithmException | NoSuchPaddingException | InvalidKeySpecException e1) {
							return "Error Encrypting RSA";
						}
					}
				}
				else if (request.getParameter("process") != null && request.getParameter("process").equals("d")) {
					if (request.getParameter("d") != null) {
						BigInteger text = new BigInteger(request.getParameter("text"));
						BigInteger d = new BigInteger(request.getParameter("d"));
						return rsaDecrypt(text, d, n);
					}
				}				
			}
		}
		else if(methodChosen.equals("mrpt")) {
			if (request.getParameter("num") != null) {
				int base = 2;
				BigInteger num = BigInteger.ONE;
				if(request.getParameter("base") != null)
				{
					try {
						base = Integer.parseInt(request.getParameter("base"));
					}
					catch (NumberFormatException e) {
						return "Number Format Exception Caught";
					}
				}
				try {
					num = new BigInteger(request.getParameter("num"));
				}
				catch (NumberFormatException e) {
					return "Number Format Exception Caught";
				}
				return millerRabin(num, base);
			}
			else {
				return "No or invalid input provided";
			}
		}
		else if(methodChosen.equals("dh")) {
			if (request.getParameter("publicP") != null && request.getParameter("publicAlpha") != null && 
					request.getParameter("privateA") != null && request.getParameter("privateB") != null) {
				try {
					BigInteger p = new BigInteger(request.getParameter("publicP"));
					BigInteger g = new BigInteger(request.getParameter("publicAlpha"));
					BigInteger aX = new BigInteger(request.getParameter("privateA"));
					BigInteger bX = new BigInteger(request.getParameter("privateB"));
					try {
						return "" + diffieHellman(p, g, aX, bX);
					} catch (NoSuchAlgorithmException e) {
						e.printStackTrace();
						return "Could Not Perform Diffie-Hellman Key Exchange";
					}
				}
				catch (NumberFormatException e) {
					return "Number Format Exception Caught";
				}
			}
			else {
				return "No input provided";
			}
		}
		else if(methodChosen.equals("signrsa")) {
			
		}
		return "";
	}
	private String rsaDecrypt(BigInteger text, BigInteger d, BigInteger n) {
		byte[] pt = text.modPow(d, n).toByteArray();
		return ("Hex: " + CryptoTools.bytesToHex(pt)+ " Word: " + new String(pt));
	}

	private String rsaEncrypt(String text, BigInteger e, BigInteger n) throws IllegalBlockSizeException, BadPaddingException, NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeySpecException, InvalidKeyException {
		try {
			BigInteger textBigInt = new BigInteger(text);
			byte[] ct = textBigInt.modPow(e, n).toByteArray();
			return ("Hex: " + CryptoTools.bytesToHex(ct)+ " Word: " + new String(ct));
		}
		catch(NumberFormatException exc){
			KeyFactory keyFactory = KeyFactory.getInstance("RSA");
	        RSAPublicKeySpec pubSpec = new RSAPublicKeySpec(n, e);
	        PublicKey pub = keyFactory.generatePublic(pubSpec);
	       
	        Cipher cipher = Cipher.getInstance("RSA/ECB/NoPadding");
	        cipher.init(Cipher.ENCRYPT_MODE, pub);
	        byte[] ct = cipher.doFinal(text.getBytes());
	        return "RSA Ciphertext= " + CryptoTools.bytesToHex(ct) + " Integer= " + new BigInteger(CryptoTools.bytesToHex(ct),16);
		}
		
	}

	private String foundationFunctions(String method, HttpServletRequest request) {
		String methodChosen = method.toLowerCase();
		if(methodChosen.equals("caesar")) {
			if (request.getParameter("text") != null) {
				String text = request.getParameter("text");
				if(request.getParameter("key") != null) {
					int key = Integer.parseInt(request.getParameter("key"));
					if (request.getParameter("process") != null && request.getParameter("process").equals("e")) {
							return caesarEncrypt(text, key);
					}
					else if (request.getParameter("process") != null && request.getParameter("process").equals("d")) {
						return caesarDecrypt(text, key);
					}
				}
				else if (request.getParameter("process") != null && request.getParameter("process").equals("b")) {
					return caesarBrute(text);
				}
			}
		}
		else if (methodChosen.equals("affine")) {
			if (request.getParameter("text") != null && request.getParameter("alpha") != null && request.getParameter("beta") != null) {
				String text = request.getParameter("text");
				int alpha = Integer.parseInt(request.getParameter("alpha"));
				int beta = Integer.parseInt(request.getParameter("beta"));
				if (request.getParameter("process") != null && request.getParameter("process").equals("e")) {
					return affineEncrypt(text, alpha, beta);
				} 
				else if (request.getParameter("process") != null && request.getParameter("process").equals("d")) {
					return affineDecrypt(text, alpha, beta);
				} 
				else {
					return "No input Provided";
				}
			}
		}
		else if(methodChosen.equals("vigenere")) {
			if (request.getParameter("text") != null && request.getParameter("key") != null) {
				String text = request.getParameter("text");
				String key = request.getParameter("key");
				if (request.getParameter("process") != null && request.getParameter("process").equals("e")) {
					return vigenereEncrypt(text, key);
				} 
				else if (request.getParameter("process") != null && request.getParameter("process").equals("d")) {
					return vigenereDecrypt(text, key);
				} 
				else {
					return "No input Provided";
				}
			}
		}
		return "";
	}

	private String symmetricFunctions(String method, HttpServletRequest request) {
		String methodChosen = method.toLowerCase();
		if(methodChosen.equals("stream")) {
			if (request.getParameter("text") != null && request.getParameter("key") != null) {
				String text = request.getParameter("text");
				String key = request.getParameter("key");
				int modFactor = 26;
				if (text.length() == key.length()) {
					if (request.getParameter("mod") != null && request.getParameter("mod").equals("bin")) {
						modFactor = 2;
					}
					if (request.getParameter("process") != null && request.getParameter("process").equals("e")) {
						return streamEncrypt(text, key, modFactor);
					}
					else if (request.getParameter("process") != null && request.getParameter("process").equals("d")) {
						return streamDecrypt(text, key, modFactor);
					}
				}
				else {
					return "input not the same length";
				}
			}
			else {
				return "No input provided";
			}
		}
		else if(methodChosen.equals("rc4")) {
			if (request.getParameter("text") != null && request.getParameter("key") != null) {
				String text = request.getParameter("text");
				String keyString = request.getParameter("key");
				byte[] key = keyString.getBytes();
				
				return rc4(text, key);
			}
			else {
				return "No Input Provided";
			}
		}
		else if(methodChosen.equals("bbs")) {
			if (request.getParameter("text") != null && request.getParameter("p") != null && 
					request.getParameter("q") != null && request.getParameter("seed") != null) {
				String text = request.getParameter("text");
				int p = Integer.parseInt(request.getParameter("p"));
				int q = Integer.parseInt(request.getParameter("q"));
				int seed = Integer.parseInt(request.getParameter("seed"));
				return bbs(text, p, q, seed);
			}
		}
		else if(methodChosen.equals("des")) {
			if (request.getParameter("text") != null && request.getParameter("key") != null) {
				String text = request.getParameter("text");
				String key = request.getParameter("key");
				if (request.getParameter("process") != null && request.getParameter("process").equals("e")) {
					try {
						return desEncrypt(text, key);
					} catch (InvalidKeyException | IllegalBlockSizeException | BadPaddingException
							| NoSuchAlgorithmException | NoSuchPaddingException e) {
						e.printStackTrace();
						return "Error DES Encrypt";
					}
				}
				else if (request.getParameter("process") != null && request.getParameter("process").equals("d")) {
					try {
						return desDecrypt(text, key);
					} catch (InvalidKeyException | InvalidAlgorithmParameterException | NoSuchAlgorithmException
							| NoSuchPaddingException | IllegalBlockSizeException | BadPaddingException e) {
						e.printStackTrace();
						return "Error DES Decrypt";
					}
				}
			}
			else {
				return "No input provided";
			}
		}
		else if(methodChosen.equals("aes")) {
			if (request.getParameter("text") != null && request.getParameter("key") != null) {
				String text = request.getParameter("text");
				String key = request.getParameter("key");
				if (request.getParameter("process") != null && request.getParameter("process").equals("e")) {
					try {
						return aesEncrypt(text, key);
					} catch (InvalidKeyException | IllegalBlockSizeException | BadPaddingException
							| NoSuchAlgorithmException | NoSuchPaddingException e) {
						e.printStackTrace();
						return "Error DES Encrypt";
					}
				}
				else if (request.getParameter("process") != null && request.getParameter("process").equals("d")) {
					try {
						return aesDecrypt(text, key);
					} catch (InvalidKeyException | InvalidAlgorithmParameterException | NoSuchAlgorithmException
							| NoSuchPaddingException | IllegalBlockSizeException | BadPaddingException e) {
						e.printStackTrace();
						return "Error DES Decrypt";
					}
				}
			}
			else {
				return "No input provided";
			}
		}
		return "";
	}

	private BigInteger euclideanAlgo(BigInteger x, BigInteger y) {
		if (x.equals(BigInteger.ZERO)) {
			return y;
		}
		return euclideanAlgo(y.mod(x), x);
	}
	private BigInteger extendedEuclideanAlgo(BigInteger x, BigInteger y, BigInteger x1, BigInteger y1) {
		if (x.equals(BigInteger.ZERO)) {
			x1 = BigInteger.ZERO;
			y1 = BigInteger.ONE;
			return y;
		}
		BigInteger x2 = BigInteger.ONE;
		BigInteger y2 = BigInteger.ONE;
		BigInteger eea = extendedEuclideanAlgo(y.mod(x), x, x2, y2);
		
		x1 = y2.subtract(y.divide(x).multiply(x2));
		y1 = x2;
		
		return eea;
	}
	private String millerRabin(BigInteger n, int base) {
        if (n.mod(new BigInteger("2")) == BigInteger.ZERO) {
            return "Composite";
        }
        BigInteger nsub1 = n.subtract(BigInteger.ONE);
        BigInteger k = BigInteger.ZERO;
        while(nsub1.mod(new BigInteger("2")).equals(BigInteger.ZERO)) {
            nsub1 = nsub1.divide(new BigInteger("2"));
            k = k.add(new BigInteger("1"));
        }
        BigInteger m = nsub1;
        BigInteger a;
        a = new BigInteger(base + "");
        BigInteger b0 = a.modPow(m, n);
        if (b0.equals(new BigInteger("1")) || b0.equals(n.subtract(BigInteger.ONE))) {
            return "probably prime";
        }
        while(!m.equals(n.subtract(BigInteger.ONE))) {
            b0 = b0.modPow(new BigInteger("2"), n);
            m = m.multiply(new BigInteger("2"));
            if (b0.equals(new BigInteger("1"))){
                return "Surely Composite";
            }
            if (b0.equals(n.subtract(BigInteger.ONE))){
                return "Probably prime";
            }
        }
        return "Composite";
    }
	private String diffieHellman(BigInteger p, BigInteger g, BigInteger aX, BigInteger bX) throws NoSuchAlgorithmException {
		BigInteger aliceKey = g.modPow(aX, p);
		BigInteger bobKey = g.modPow(bX, p);
		
		BigInteger commonKeyAlice = bobKey.modPow(aX, p);
		BigInteger commonKeyBob = aliceKey.modPow(bX, p);
		String output = "";
		output += "Session Key From Alice " + commonKeyAlice + " Session Key From Bob " + commonKeyBob + " Is Equal? " + commonKeyBob.equals(commonKeyAlice);
		return output;
	}
	private String caesarEncrypt(String text, int key) {
		byte[] pt = text.getBytes();
		pt = CryptoTools.clean(pt);
		byte[] ct = new byte[pt.length];
		for(int i = 0; i < pt.length; i++) {
			ct[i] = (byte) ((byte) ((byte) (pt[i] - 'A') + key) % 26 + 'A');
		}
		return "CipherText: " + new String(ct);
	}
	private String caesarDecrypt(String text, int key) {
		byte[] pt = text.getBytes();
		pt = CryptoTools.clean(pt);
		byte[] ct = new byte[pt.length];
		for(int i = 0; i < pt.length; i++) {
			int shift = pt[i] - 'A' - key;
			if (shift < 0) {
				ct[i] = (byte) CryptoTools.ALPHABET.charAt(CryptoTools.ALPHABET.length() + shift);
			}
			else {
				ct[i] = (byte) ((byte) ((byte) (pt[i] - 'A') - key) % 26 + 'A');
			}
		}
		return "PlainText: " + new String(ct);
	}

	private String caesarBrute(String text) {
		// Reads the contents of the file
		byte[] ct = text.getBytes();
		double cosSimHolder = 0.0;
		int key = 0;
		// Caesar Decryption
		for (int i = 0; i < 26; i++) {
			byte[] test = new byte[ct.length];
			for (int j = 0; j < ct.length; j++) {
				test[j] = (byte) (((char) (ct[j] + 'A') - i) % 26 + 'A');
			}
			int[] frequencies = CryptoTools.getFrequencies(test);
			int dotProduct = 0;
			double englishNorm = 0;
			double freqNorm = 0;
			for (int k = 0; k < CryptoTools.ENGLISH.length; k++) {
				dotProduct += frequencies[k] * CryptoTools.ENGLISH[k];
				freqNorm += Math.pow(frequencies[k], 2);
				englishNorm += Math.pow(CryptoTools.ENGLISH[k], 2);
			}
			double cosSim = (double) dotProduct / (Math.sqrt(freqNorm) * Math.sqrt(englishNorm));
			if (cosSimHolder < cosSim) {
				key = i;
				cosSimHolder = cosSim;
			}

		}
		byte[] answer = new byte[ct.length];
		for (int k = 0; k < ct.length; k++) {
			answer[k] = (byte) (((char) (ct[k] + 'A') - key) % 26 + 'A');
		}
		return "Key is " + key + " Answer " + new String(answer);
	}
	private String affineEncrypt(String text, int alpha, int beta) {
		byte[] pt = text.getBytes();
		pt = CryptoTools.clean(pt);
		byte[] ct = new byte[pt.length];
		for(int i = 0; i < pt.length; i++) {
			ct[i] = (byte) ((byte) ((byte) (pt[i] - 'A') * alpha + beta) % 26 + 'A');
		}
		return "CipherText: " + new String(ct);
	}
	
	private String affineDecrypt(String text, int alpha, int beta) {
		byte[] ct = text.getBytes();
		ct = CryptoTools.clean(ct);
		byte[] pt = new byte[ct.length];
		int invFlag = 0;
		for (int i = 0; i< 26; i++) {
			invFlag = (alpha * i) % 26;
			if (invFlag == 1) {
				invFlag = 1;
			}
		}
		String output = "";
		for (int i = 0; i < text.length(); i++)
        {
            if (text.charAt(i) != ' ')
            {
            	output = output + (char) (((invFlag *
                        ((text.charAt(i) + 'A' - beta)) % 26)) + 'A');
            }
            else //else simply append space character
            {
                output += text.charAt(i);
            }
        }
		return "Plaintext: " + output;
	}
	
	private String vigenereEncrypt(String text, String key) {
		String ct = "";
		int y = text.length();
		for (int i = 0; ; i++) {
			if (y == i) {
				i = 0;
			}
			if (key.length() == text.length()) {
				break;
			}
			key += key.charAt(i);
		}
		for (int i = 0; i < text.length(); i++) {
			int x = (text.charAt(i) + key.charAt(i)) % 26;
			x += 'A';
			ct += (char)(x);
		}
		return ct;
	}
	private String vigenereDecrypt(String text, String key) {
		String pt = "";
		for (int i = 0; i < text.length() && i < key.length(); i++) {
			int x = (text.charAt(i) - key.charAt(i) + 26) % 26;
			
			x += 'A';
			pt += (char)(x);
		}
		return pt;
	}
	
	private String streamDecrypt(String text, String key, int modFactor) {
		byte[] pt = text.getBytes();
		pt = CryptoTools.clean(pt);
		if (modFactor == 26) {
			byte[] ct = new byte[pt.length];
			for(int i = 0; i < pt.length; i++) {
				char keyChar = key.charAt(i);
				int charPosition = keyChar - 'A' + 1;
				int shift = pt[i] - 'A' - charPosition;
				if (shift < 0) {
					ct[i] = (byte) CryptoTools.ALPHABET.charAt(CryptoTools.ALPHABET.length() + shift);
				}
				else {
					ct[i] = (byte) ((byte) ((byte) (pt[i] - 'A') - (charPosition % 26)) % 26 + 'A');
				}
			}
			return "PlainText: " + new String(ct);
		}
		else {
			String binOutput = "";
			for (int i = 0; i < text.length(); i++) {
				int textBit = Integer.parseInt("" + text.charAt(i));
				int keyBit = Integer.parseInt("" + key.charAt(i));
				binOutput += ("" + ((textBit + keyBit) % 2));
			}
			return binOutput;
		}
	}

	private String streamEncrypt(String text, String key, int modFactor) {
		byte[] pt = text.getBytes();
		pt = CryptoTools.clean(pt);
		if (modFactor == 26) {
			byte[] ct = new byte[pt.length];
			for(int i = 0; i < pt.length; i++) {
				char keyChar = key.charAt(i);
				int charPosition = keyChar - 'A' + 1;
				ct[i] = (byte) ((byte) ((byte) (pt[i] - 'A') + charPosition) % 26 + 'A');
			}
			return "CipherText: " + new String(ct);
		}
		else {
			String binOutput = "";
			for (int i = 0; i < text.length(); i++) {
				int textBit = Integer.parseInt("" + text.charAt(i));
				int keyBit = Integer.parseInt("" + key.charAt(i));
				binOutput += ("" + ((textBit + keyBit) % 2));
			}
			return binOutput;
		}
	}
	private String bbs(String binPT, int p, int q, int seed) {
		if (!isPrime(p) && !isPrime(q)) {
			return "";
		}
		int m = p * q;
		String ct = "";
		for (int i = 0; i < binPT.length(); i++) {
			seed = (seed * seed) % m;
			ct += binPT.charAt(i) ^ (seed % 2);
		}
		return ct;
	}
	private String rc4(String binPT, byte[] key) {
		int[] s = new int[256];
		for (int i = 0; i < 256; i++) {
			s[i] = i;
		}
		int j = 0;
		for (int i = 0; i < 256; i++) {
			j = (j + s[i] + key[i % key.length]) % 256;
			int temp = s[i];
			s[i] = s[j];
			s[j] = temp;
		}
		int i = 0;
		j = 0;
		int counter = 0;
		int k = 0;
		String ct = "";
		while (counter < binPT.length()) {
			i = (i + 1) % 256;
			j = (j + s[i]) % 256;
			int temp = s[i];
			s[i] = s[j];
			s[j] = temp;
			k = s[(s[i] + s[j]) % 256];
			ct += k ^ binPT.charAt(counter);
			counter++;
		}
		return ct;
	}
	private String desEncrypt(String ptString, String keyString) throws IllegalBlockSizeException, BadPaddingException, NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException {
		byte[] key = keyString.getBytes();
		byte[] pt = ptString.getBytes();
		Key secret = new SecretKeySpec(key, "DES");
		Cipher cipher = Cipher.getInstance("DES");
		cipher.init(Cipher.ENCRYPT_MODE, secret);
		
		byte[] ct = cipher.doFinal(pt);
		String output = "Hex= " + CryptoTools.bytesToHex(ct);
		return output;
	}
	private String desDecrypt(String ctString, String keyString) throws InvalidKeyException, InvalidAlgorithmParameterException, NoSuchAlgorithmException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException {
		byte[] key = keyString.getBytes();
		byte[] ct = CryptoTools.hexToBytes(ctString);
		
		Key secret = new SecretKeySpec(key, "DES");
		Cipher cipher = Cipher.getInstance("DES");
		cipher.init(Cipher.DECRYPT_MODE, secret);
		
		byte[] pt = cipher.doFinal(ct);
		return ("Hex= " + CryptoTools.bytesToHex(pt)+ " Word= " + new String(pt));
	}
	
	private String aesEncrypt(String ptString, String keyString) throws IllegalBlockSizeException, BadPaddingException, NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException {
		byte[] key = keyString.getBytes();
		byte[] pt = ptString.getBytes();
		Key secret = new SecretKeySpec(key, "AES");
		Cipher cipher = Cipher.getInstance("AES/ECB/NoPadding");
		cipher.init(Cipher.ENCRYPT_MODE, secret);
		
		byte[] ct = cipher.doFinal(pt);

		ct = cipher.doFinal(ct);
		return ("Hex= " + CryptoTools.bytesToHex(ct));
	}
	private String aesDecrypt(String ctString, String keyString) throws InvalidKeyException, InvalidAlgorithmParameterException, NoSuchAlgorithmException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException {
		byte[] key = keyString.getBytes();
		byte[] ct = CryptoTools.hexToBytes(ctString);
		
		Key secret = new SecretKeySpec(key, "AES");
		Cipher cipher = Cipher.getInstance("AES/ECB/NoPadding");
		cipher.init(Cipher.DECRYPT_MODE, secret);
		
		byte[] pt = cipher.doFinal(ct);
		return ("Hex= " + CryptoTools.bytesToHex(pt));
	}
	private boolean isPrime(int num) {
		if (num <= 1) {
			return false;
		}
		for (int i = 2; i < num; i++) {
			if (num % i == 0) {
				return false;
			}
		}
		return true;
	}
}
